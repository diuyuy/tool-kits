import { input } from "@inquirer/prompts";
import chalk from "chalk";
import clipboard from "clipboardy";
import ora from "ora";
import z from "zod";
import type { ErrorData, ExtractResult } from "./web-scrapper.type.js";

export const webScrapper = async () => {
  const spinner = ora("Loading extracting...");

  try {
    const url = await input({
      message: "URL을 입력해주세요.",
      required: true,
      validate: (value) => {
        const validator = z.url();

        const result = validator.safeParse(value);

        return result.success;
      },
    });

    spinner.start();

    const { results } = await tavilyExtract(url);
    const rawContent = results[0]?.raw_content;

    if (!rawContent) {
      spinner.stop();
      console.log("No content!");
      return;
    }

    const rawList = rawContent.split("\n");

    const startIdx = rawList.findIndex((str) => str.startsWith("# "));

    const content = rawList.slice(startIdx).join("\n\n");

    await clipboard.write(content);

    spinner.stop();

    console.log(content);

    console.log(chalk.blue("\n\n클립보드에 콘텐츠가 복사되었습니다.\n\n"));
  } catch (error) {
    spinner.stop();

    throw error;
  }
};

async function tavilyExtract(url: string): Promise<ExtractResult> {
  const apkKey = process.env.TAVILY_SEARCH_API_KEY;

  if (!apkKey) {
    throw Error("TAVILY_SEARCH_API_KEY가 존재하지 않습니다.");
  }

  const response = await fetch("https://api.tavily.com/extract", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apkKey}`,
    },
    body: JSON.stringify({
      urls: url,
    }),
  });

  if (!response.ok) {
    const errorData: ErrorData = (await response.json()) as ErrorData;

    throw new Error(errorData.detail.error);
  }

  return (await response.json()) as ExtractResult;
}

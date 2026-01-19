import { input } from "@inquirer/prompts";
import chalk from "chalk";
import fs from "fs/promises";
import ora from "ora";
import path from "path";
import { braveSearch } from "./brave-search.js";
import { scrapeToMarkdown } from "./scrape-to-markdown.js";

export const webResearcher = async () => {
  const query = await input({
    message: "입력할 쿼리:",
    required: true,
  });

  const spinner = ora("Loading...");

  try {
    spinner.start();

    const {
      web: { results },
    } = await braveSearch(query);

    spinner.stop();
    console.log(
      chalk.green("Brave Search로 데이터를 성공적으로 가져왔습니다."),
    );

    spinner.start();

    await Promise.allSettled(
      results.map(async ({ title, url }) => {
        const markdown = await scrapeToMarkdown(url);
        const safeTitle = sanitizeFilename(title);
        const filepath = path.join(
          process.cwd(),
          "resources",
          `${safeTitle}.md`,
        );

        await fs.writeFile(filepath, markdown);
      }),
    );

    spinner.stop();

    console.log(chalk.blue("\n\n데이터를 성공적으로 저장했습니다!\n\n"));
  } catch (error) {
    spinner.stop();

    throw error;
  }
};

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[/\\:*?"<>|]/g, "-") // 특수문자 제거
    .replace(/\s+/g, "_") // 공백을 언더스코어로
    .substring(0, 200); // 너무 긴 파일명 방지
}

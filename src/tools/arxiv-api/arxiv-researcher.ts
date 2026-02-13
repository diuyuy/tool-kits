import { input } from "@inquirer/prompts";
import chalk from "chalk";
import fs from "fs/promises";
import path from "node:path";
import ora from "ora";
import { sanitizeFilename } from "../../utils/sanitize-file-name.js";
import { searchArxiv } from "./search-arxiv.js";

export const arxivAPI = async () => {
  const spinner = ora("Loading...");

  const query = await input({
    message: "입력할 쿼리:",
    required: true,
  });

  try {
    spinner.start();

    const result = await searchArxiv(query);

    const parentPath = path.join(
      process.cwd(),
      "resources",
      sanitizeFilename(query),
    );

    await fs.mkdir(parentPath, { recursive: true });

    await fs.writeFile(
      path.join(parentPath, "result.json"),
      JSON.stringify(
        result.map(({ title, authors, pdfLink, published, categories }) => ({
          title,
          authors,
          pdfLink,
          published,
          categories,
        })),
        null,
        2,
      ),
    );

    spinner.stop();

    console.log(chalk.blue("\n\n데이터를 성공적으로 저장했습니다.\n\n"));
  } catch (error) {
    spinner.stop();

    throw error;
  }
};

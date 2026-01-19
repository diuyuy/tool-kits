import { input } from "@inquirer/prompts";
import chalk from "chalk";
import fs from "fs/promises";
import ora from "ora";
import path from "path";
import { braveSearch } from "./brave-search.js";
import { sanitizeFilename } from "./sanitize-file-name.js";
import { scrapeToMarkdown } from "./scrape-to-markdown.js";

export const webResearcher = async () => {
  const query = await input({
    message: "입력할 쿼리:",
    required: true,
  });

  const spinner = ora("Loading...");

  try {
    spinner.start();

    const { web } = await braveSearch(query);

    spinner.stop();
    console.log(
      chalk.green("Brave Search로 데이터를 성공적으로 가져왔습니다."),
    );

    spinner.start();

    const parentFilepath = path.join(
      process.cwd(),
      "resources",
      sanitizeFilename(query),
    );

    await fs.mkdir(parentFilepath, { recursive: true });

    await Promise.allSettled([
      fs.writeFile(
        `${parentFilepath}/search-result.json`,
        JSON.stringify(web, null, 2),
      ),
      ...web.results.map(async ({ title, url }) => {
        const markdown = await scrapeToMarkdown(url);
        const safeTitle = sanitizeFilename(title);
        const filepath = path.join(parentFilepath, `${safeTitle}.md`);

        await fs.writeFile(filepath, markdown);

        console.log(
          chalk.cyan(`\n${safeTitle}.md 파일이 성공적으로 저장되었습니다.`),
        );
      }),
    ]);

    spinner.stop();

    console.log(chalk.blue("\n\n모든 데이터를 성공적으로 저장했습니다!\n\n"));
  } catch (error) {
    spinner.stop();

    throw error;
  }
};

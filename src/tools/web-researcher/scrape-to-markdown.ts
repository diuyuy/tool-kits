import { chromium } from "playwright";
import TurndownService from "turndown";

export const scrapeToMarkdown = async (url: string) => {
  const browser = await chromium.launch({
    timeout: 10000,
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, {
      waitUntil: "networkidle",
    });

    // Playwright API로 요소 제거 (TypeScript 에러 없음)
    const removeElememnts = [
      "script",
      "style",
      "nav",
      "header",
      "footer",
      ".advertisement",
    ];

    await Promise.all(
      removeElememnts.map(async (element) => {
        await page
          .locator(element)
          .evaluateAll((els) => els.forEach((el) => el.remove()));
      }),
    );

    const htmlContent = await page.locator("body").innerHTML();
    const title = await page.title();

    await browser.close();

    const turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
    });

    const markdown = turndownService.turndown(htmlContent);

    return `Title: ${title}\n\n ${markdown}`;
  } finally {
    await browser.close();
  }
};

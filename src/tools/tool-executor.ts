import { WEB_RESEARCHER, WEB_SCRAPPER } from "../constants.js";
import { webResearcher } from "./web-researcher/web-researcher.js";
import { webScrapper } from "./web-scrapper/web-scrapper.js";

export type ToolName = typeof WEB_SCRAPPER | typeof WEB_RESEARCHER;

export const toolExecutor = async (toolName: ToolName) => {
  switch (toolName) {
    case "web-scrapper":
      return await webScrapper();
    case "web-researcher":
      return await webResearcher();
    default:
      return "해당 TOOL이 존재하지 않습니다.";
  }
};

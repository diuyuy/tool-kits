import { confirm, select } from "@inquirer/prompts";
import { config } from "dotenv";
import { WEB_RESEARCHER, WEB_SCRAPPER } from "./constants.js";
import { toolExecutor, type ToolName } from "./tools/tool-executor.js";

config();

async function run() {
  try {
    while (true) {
      const tool = await select<ToolName>({
        message: "사용할 도구를 선택해주세요",
        choices: [
          {
            name: WEB_SCRAPPER,
            value: WEB_SCRAPPER,
            description: "웹 스크래핑 도구",
          },
          {
            name: WEB_RESEARCHER,
            value: WEB_RESEARCHER,
            description: "웹 리서치 도구",
          },
        ],
      });

      await toolExecutor(tool);

      const answer = await confirm({
        message: "다른 도구를 호출하시겠습니까?",
        default: false,
      });

      if (!answer) break;
    }
  } catch (error) {
    if (error instanceof Error && error.name === "ExitPromptError") {
      return;
    }

    console.error(error);

    throw error;
  }
}

run();

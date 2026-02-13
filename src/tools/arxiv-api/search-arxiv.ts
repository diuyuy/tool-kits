import { promisify } from "util";
import { parseString } from "xml2js";
import {
  ArxivAuthor,
  ArxivCategory,
  ArxivFeedResponse,
  ArxivLink,
} from "./types.js";

export const searchArxiv = async (query: string) => {
  const parseXML = promisify(parseString);

  const requestUrl = new URL("http://export.arxiv.org/api/query");

  requestUrl.searchParams.append("search_query", query);
  requestUrl.searchParams.append("start", "0");
  requestUrl.searchParams.append("max_results", "10");

  const response = await fetch(requestUrl, {
    method: "GET",
  });

  if (!response.ok) {
    const errorStatus = response.status;

    throw new Error(
      `Arxiv API 호출을 실패했습니다. Status Code: ${errorStatus}`,
    );
  }

  const xmlText = await response.text();

  const result = (await parseXML(xmlText)) as ArxivFeedResponse;

  const entries = result.feed.entry ?? [];

  return entries.map((entry) => ({
    id: entry.id[0],
    title: entry.title[0]?.trim() ?? "",
    summary: entry.summary[0]?.trim() ?? "",
    authors: entry.author.map((a: ArxivAuthor) => a.name[0]),
    published: entry.published[0],
    updated: entry.updated[0],
    link:
      entry.link.find((l: ArxivLink) => l.$.rel === "alternate")?.$.href || "",
    pdfLink:
      entry.link.find((l: ArxivLink) => l.$.title === "pdf")?.$.href || "",
    categories: entry.category?.map((c: ArxivCategory) => c.$.term),
    comment: entry["arxiv:comment"]?.[0],
    journalRef: entry["arxiv:journal_ref"]?.[0],
    doi: entry["arxiv:doi"]?.[0],
  }));
};

export interface ArxivLink {
  $: {
    href: string;
    rel?: string;
    type?: string;
    title?: string;
  };
}

export interface ArxivAuthor {
  name: string[];
  affiliation?: string[];
}

export interface ArxivCategory {
  $: {
    term: string;
    scheme: string;
  };
}

export interface ArxivEntry {
  id: string[];
  title: string[];
  summary: string[];
  author: ArxivAuthor[];
  published: string[];
  updated: string[];
  link: ArxivLink[];
  category?: ArxivCategory[];
  "arxiv:primary_category"?: ArxivCategory[];
  "arxiv:comment"?: string[];
  "arxiv:journal_ref"?: string[];
  "arxiv:doi"?: string[];
}

export interface ArxivFeedResponse {
  feed: {
    entry?: ArxivEntry[];
    title?: string[];
    id?: string[];
    updated?: string[];
    "opensearch:totalResults"?: string[];
    "opensearch:startIndex"?: string[];
    "opensearch:itemsPerPage"?: string[];
  };
}

export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  published: string;
  updated: string;
  link: string;
  pdfLink: string;
  categories?: string[];
  comment?: string;
  journalRef?: string;
  doi?: string;
}

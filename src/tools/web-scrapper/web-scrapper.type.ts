export interface ExtractResult {
  results: {
    url: string;
    raw_content: string;
    images: string[];
  }[];
}

export interface ErrorData {
  detail: {
    error: string;
  };
}

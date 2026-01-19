export interface BraveSearchResult {
  web: {
    results: {
      title: string;
      url: string;
      description?: string;
    }[];
  };
}

export interface BraveSearchErrorResponse {
  errors: {
    detail: string;
  }[];
}

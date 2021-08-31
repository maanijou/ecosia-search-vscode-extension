export function appendLanguageID(query: string, languageId: string | undefined, searchEngine: string): string {
    let newQuery: string = query;

    if (!languageId) {
        return query;
    }

    if (["ecosia", "duckduckgo", "google", "bing"].includes(searchEngine)) {
        newQuery = `${newQuery} +${languageId}`;
    } else if (searchEngine === "stackoverflow") {
        newQuery = `[${languageId}] ${newQuery}`;
    }

    return newQuery;
}

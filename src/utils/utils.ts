export function appendLanguageID(query: string, languageId: string | undefined, searchEngine: string): string {
    let newQuery: string = query;

    if (!languageId || languageId === "plaintext") {
        return query;
    }

    if (["ecosia", "duckduckgo", "google", "bing", "brave", "yandex"].includes(searchEngine)) {
        newQuery = `${newQuery} +${languageId}`;
    } else if (searchEngine === "stackoverflow") {
        newQuery = `[${languageId}] ${newQuery}`;
    }

    return newQuery;
}

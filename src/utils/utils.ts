export function appendLanguageID(query: string, languageId: string | undefined, searchEngine: string): string {
    let newQuery: string = query;

    if(!languageId) {
        return query;
    }

    if(searchEngine === "ecosia" || searchEngine === "duckduckgo" || searchEngine  === "google"){
        newQuery = `${newQuery} +${languageId}`;
    }

    return newQuery;
}

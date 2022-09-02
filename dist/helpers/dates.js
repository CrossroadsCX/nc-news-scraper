export const sortByDate = (articles) => {
    return articles.sort((a, b) => {
        return parseInt(b.dateTime) - parseInt(a.dateTime);
    });
};
//# sourceMappingURL=dates.js.map
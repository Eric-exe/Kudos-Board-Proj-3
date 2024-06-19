class utils {
    // returns a filter object based on the filter value to
    // be passed to the API.getBoardData function
    static toFilterObject(filterValue, userId) {
        const filters = {
            "All": {},
            "Recent": { recent: true },
            "Created": { authorId: userId },
            "Category": { category: filterValue }
        };

        return filters[filterValue] || filters["Category"];
    }
}

export default utils;
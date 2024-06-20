class API {
    static async fetchRequest(url, method, body, funct, concat) {
        try {
            let fetchInput = {
                "method": method,
                "headers": {
                    'Content-Type': 'application/json'
                },
            }

            if (fetchInput["method"] != "get") {
                fetchInput["body"] = body
            }

            const response = await fetch(url, fetchInput)
            if (!response || !response.ok) {
                throw new Error("Failed to GET");
            }
            const data = await response.json();
            funct(concat ? old => [...old, data] : data)
        }
        catch (error) {
            console.error(error)
        }
    }

    static async getUserData(funct, id) {
        this.fetchRequest(
            import.meta.env.VITE_DB_URL + "/user/" + String(id),
            "get",
            "",
            funct,
            false
        )
    }

    static async getBoardsData(funct, filters) {
        let url = import.meta.env.VITE_DB_URL + "/boards?";
        for (const key in filters) {
            url += key + "=" + filters[key] + "&";
        }
        url = url.slice(0, -1);
        this.fetchRequest(
            url,
            "get",
            "",
            funct,
            false
        )
    }

    static async getBoardData(funct, id) {
        this.fetchRequest(
            import.meta.env.VITE_DB_URL + "/boards/" + String(id),
            "get",
            "",
            funct,
            false
        )
    }

    static async createBoard(funct, authorId, title, imgUrl, category) {
        this.fetchRequest(
            import.meta.env.VITE_DB_URL + "/boards",
            "post",
            JSON.stringify({
                "authorId": authorId,
                "title": title,
                "imgUrl": imgUrl,
                "category": category
            }),
            funct,
            true
        )
    }

    static async deleteBoard(funct, id, authorId) {
        this.fetchRequest(
            import.meta.env.VITE_DB_URL + "/boards/" + String(id),
            "delete",
            JSON.stringify({
                "authorId": authorId
            }),
            funct,
            false
        )
    }

    static async getGIFsData(funct, query) {
        this.fetchRequest(
            import.meta.env.VITE_DB_URL + "/gifs/" + query,
            "get",
            "",
            funct,
            false
        )
    }
}

export default API
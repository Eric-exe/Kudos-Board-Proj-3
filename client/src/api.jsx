class API {
    static async fetchRequest(url, method, body, funct, concat) {
        try {
            let fetchInput = {
                "method": method,
                "headers": {
                    'Content-Type': 'application/json'
                }
            }

            if (fetchInput["method"] != "get") {
                fetchInput["body"] = body
            }

            const response = await fetch(url, fetchInput)
            if (!response || !response.ok) {
                console.log(url);
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
            {},
            funct,
            false
        )
    }

    static async getBoardData(funct) {
        this.fetchRequest(
            import.meta.env.VITE_DB_URL + "/boards",
            "get",
            {},
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
}

export default API
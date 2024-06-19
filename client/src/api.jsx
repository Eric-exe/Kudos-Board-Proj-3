class API {
    static async fetchRequest(url, method, body, funct) {
        try {
            let fetchInput = {}
            fetchInput["method"] = method
            if (fetchInput["method"] != "get") {
                fetchInput["body"] = body
            }

            const response = await fetch(url, fetchInput)
            if (!response || !response.ok) {
                console.log(url);
                throw new Error("Failed to GET");
            }
            const data = await response.json();
            funct(data)
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
            funct
        )
    }

    static async getBoardsData(funct) {
        this.fetchRequest(
            import.meta.env.VITE_DB_URL + "/boards",
            "get",
            {},
            funct
        )
    }
}

export default API
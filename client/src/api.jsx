class API {
    static async fetchRequest(url, method, body, funct, concat) {
        try {
            let fetchInput = {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
            };

            if (fetchInput["method"] != "get") {
                fetchInput["body"] = body;
            }

            const response = await fetch(url, fetchInput);
            if (!response || !response.ok) {
                console.error("Failed to GET");
                return response;
            }
            const data = await response.json();
            funct(concat ? (old) => [...old, data] : data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    static async getUserData(funct, id) {
        return await this.fetchRequest(import.meta.env.VITE_DB_URL + "/user/" + String(id), "get", "", funct, false);
    }

    static async getBoardsData(funct, filters) {
        let url = import.meta.env.VITE_DB_URL + "/boards?";
        for (const key in filters) {
            url += key + "=" + filters[key] + "&";
        }
        url = url.slice(0, -1);
        return await this.fetchRequest(url, "get", "", funct, false);
    }

    static async getBoardData(funct, id) {
        return await this.fetchRequest(import.meta.env.VITE_DB_URL + "/boards/" + String(id), "get", "", funct, false);
    }

    static async createBoard(funct, authorId, title, imgUrl, category) {
        return await this.fetchRequest(
            import.meta.env.VITE_DB_URL + "/boards",
            "post",
            JSON.stringify({ authorId, title, imgUrl, category }),
            funct,
            true
        );
    }

    static async deleteBoard(id, authorId) {
        return await this.fetchRequest(
            import.meta.env.VITE_DB_URL + `/boards/${id}`,
            "delete",
            JSON.stringify({ authorId }),
            () => {},
            false
        );
    }

    static async getGIFsData(funct, query) {
        return this.fetchRequest(import.meta.env.VITE_DB_URL + "/gifs/" + query, "get", "", funct, false);
    }

    static async createCard(authorId, boardId, content, gifUrl, signed) {
        return await this.fetchRequest(
            import.meta.env.VITE_DB_URL + "/card",
            "post",
            JSON.stringify({ authorId, boardId, content, gifUrl, signed }),
            () => {},
            true
        );
    }

    static async likeCard(cardId, userId, isLiked) {
        return await this.fetchRequest(
            import.meta.env.VITE_DB_URL + `/card/like/${cardId}`,
            "post",
            JSON.stringify({ userId, isLiked }),
            () => {},
            false
        );
    }

    static async deleteCard(id, authorId) {
        return await this.fetchRequest(
            import.meta.env.VITE_DB_URL + `/card/${id}`,
            "delete",
            JSON.stringify({ id, authorId }),
            () => {},
            false
        );
    }

    static async registerUser(funct, username, password) {
        return await this.fetchRequest(
            import.meta.env.VITE_DB_URL + "/user/register",
            "post",
            JSON.stringify({ username, password }),
            funct,
            false
        )
    }

    static async loginUser(funct, username, password) {
        return await this.fetchRequest(
            import.meta.env.VITE_DB_URL + "/user/login",
            "post",
            JSON.stringify({ username, password }),
            funct,
            false
        )
    }
    
    static async createComment(cardId, authorId, content) {
        return await this.fetchRequest(
            import.meta.env.VITE_DB_URL + `/card/${cardId}/comment`,
            "post",
            JSON.stringify({ authorId, content }),
            () => {},
            false
        )
    }
}

export default API;

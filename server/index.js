require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/user", require("./routes/userRoutes"));
app.use("/boards", require("./routes/boardRoutes"));
app.use("/card", require("./routes/cardRoutes"));

// external API call
app.get("/gifs/:query", async (req, res) => {
    const query = req.params.query;
    if (query == "") {
        res.json("");
        return;
    }

    let url = "http://api.giphy.com/v1/gifs/search?api_key=" + process.env.GIPHY_KEY + "&q=" + query;
    const response = await fetch(url);
    if (!response || !response.ok) {
        console.error("Failed to fetch from GIPHY");
        res.status(500).send("Failed to fetch from GIPHY");
        return;
    }
    res.json(await response.json());
});

app.listen(PORT, async () => {
    const guest = await prisma.User.findUnique({
        where: { username: "Guest" },
    });

    if (!guest) {
        console.log("Creating Guest user");
        await prisma.User.create({
            data: { username: "Guest", password: "Guest", id: -1 },
        });
    }

    console.log(`Server listening on port ${PORT}`);
});

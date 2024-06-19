require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


// User routes
app.post("/register", async (req, res) => {
    // verify body is good
    const { username, password } = req.body || {};
    if (username == undefined) {
        res.status(400).send("Bad username or password");
        return;
    }
    // verify if username is already in use
    const userWithSameName = await prisma.User.findUnique({
        where: { username: username },
    });

    if (userWithSameName) {
        res.status(409).send("Username taken");
        return;
    }

    const newUser = await prisma.User.create({
        data: { username: username, password: password },
    });

    // hide password
    res.json({ id: newUser["id"], username: newUser["username"] });
});

app.get("/user/:id", async (req, res) => {
    const id = parseInt(req.params.id) || undefined;

    if (id == undefined) {
        res.status(400).send("Bad id");
        return;
    }

    const user = await prisma.User.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
            boardsCreated: true,
            boardsLiked: true,
            boardsDisliked: true,
        },
    });

    if (user) {
        delete user["password"];
        res.json(user);
    } else {
        res.status(404).send("No user found");
    }
});

// Board routes
app.post("/boards", async (req, res) => {
    const { authorId, title, imgUrl, category } = req.body;

    const newBoard = await prisma.Board.create({
        data: {
            authorId: authorId,
            title: title,
            imgUrl: imgUrl,
            category: category,
            upvotes: 0,
            usersLiked: {},
            usersDisliked: {},
        },
        include: { author: true}
    });

    delete newBoard["author"]["password"];
    res.json(newBoard);
});

app.get("/boards", async (req, res) => {
    // handle query parameters
    let whereObj = {};
    if (req.query.category) {
        whereObj = { category: req.query.category };
    }
    if (req.query.authorId) {
        whereObj = { authorId: parseInt(req.query.authorId) };
    }

    let boards = await prisma.Board.findMany({
        include: { author: true },
        where: whereObj,
    });

    for (const board of boards) {
        delete board["author"]["password"];
    }

    if (req.query.recent && req.query.recent == "true") {
        boards.sort((a, b) => b["id"] - a["id"]);
    }
    else {
        // default, sort by upvotes
        boards.sort((a, b) => b["upvotes"] - a["upvotes"]);
    }

    res.json(boards);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

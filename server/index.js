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
            cardsCreated: true,
            cardsLiked: true,
            cardsDisliked: true,
            commentsCreated: true
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
            cards: {}
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
    if (req.query.title) {
        whereObj = { 
            title: { 
                contains: req.query.title,
                mode: "insensitive" 
            },
        };
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

    res.json(boards);
});

app.delete('/boards/:id', async (req, res) => {
    const id = parseInt(req.params.id) || undefined;
    const authorId = parseInt(req.body.authorId) || undefined;

    if (id == undefined) {
        res.status(400).send("Bad id");
        return;
    }

    const board = await prisma.Board.delete({
        where: { 
            id: id, 
            authorId: authorId
        },
    });

    if (!board) {
        res.status(404).send("No board found");
        return;
    }

    res.json(board);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

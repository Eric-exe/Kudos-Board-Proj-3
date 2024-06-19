require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// User
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

    // grab everything except the password
    const user = await prisma.User.findUnique({
        where: { id: parseInt(req.params.id) },
        select: { id: true, username: true, boardsCreated: true, boardsLiked: true, boardsDisliked: true },
    });

    if (user) {
        res.json(user);
    } else {
        res.status(404).send("No user found");
    }
});

// Boards
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
    });

    res.json(newBoard);
});

app.get("/boards", async (req, res) => {
    res.json(await prisma.Board.findMany({
        include: { author: true }
    }));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

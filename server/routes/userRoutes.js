const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
    // verify body is good
    const { username, password } = req.body || undefined;
    if (
        username == undefined ||
        password == undefined ||
        username == "" ||
        password == "" ||
        username.includes(" ") ||
        password.includes(" ")
    ) {
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
        data: {
            username: username,
            password: password,
            boardsCreated: {},
            cardsCreated: {},
            commentsCreated: {},
            cardsLiked: {},
        },
        include: {
            boardsCreated: true,
            cardsCreated: true,
            commentsCreated: true,
            cardsLiked: true,
        },
    });

    delete newUser["password"];
    res.json(newUser);
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (
        username == undefined ||
        password == undefined ||
        username == "" ||
        password == "" ||
        username.includes(" ") ||
        password.includes(" ")
    ) {
        res.status(400).send("Bad username or password");
        return;
    }

    const user = await prisma.User.findUnique({
        where: { username, password },
        include: {
            boardsCreated: true,
            cardsCreated: true,
            commentsCreated: true,
            cardsLiked: true,
        },
    });

    if (!user) {
        res.status(409).send("No user found");
        return;
    }

    res.json(user);
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id) || undefined;
    if (id === undefined) {
        res.status(400).send("Bad id");
        return;
    }

    const user = await prisma.User.findUnique({
        where: { id },
        include: {
            boardsCreated: true,
            cardsCreated: true,
            commentsCreated: true,
            cardsLiked: true,
        },
    });

    if (user) {
        delete user["password"];
        res.json(user);
    } else {
        res.status(404).send("No user found");
    }
});

module.exports = router;

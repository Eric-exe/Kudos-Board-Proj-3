const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validateCreds = (username, password) => {
    return username && password && !username.includes(" ") && !password.includes(" ");
};

const userIncludeOptions = {
    boardsCreated: true,
    cardsCreated: true,
    commentsCreated: true,
    cardsLiked: true,
};

router.post("/register", async (req, res) => {
    const { username, password } = req.body || {};

    if (!validateCreds(username, password)) {
        return res.status(400).send("Bad username or password");
    }

    const existingUser = await prisma.User.findUnique({ where: { username } });
    if (existingUser) {
        return res.status(409).send("Username taken");
    }

    const newUser = await prisma.User.create({
        data: { username, password, boardsCreated: {}, cardsCreated: {}, commentsCreated: {}, cardsLiked: {} },
        include: userIncludeOptions,
    });

    delete newUser.password;
    res.json(newUser);
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body || {};

    if (!validateCreds(username, password)) {
        return res.status(400).send("Bad username or password");
    }

    const user = await prisma.User.findUnique({
        where: { username, password },
        include: userIncludeOptions,
    });

    if (!user) {
        return res.status(409).send("No user found");
    }

    res.json(user);
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send("Bad id");
    }

    const user = await prisma.User.findUnique({
        where: { id },
        include: userIncludeOptions,
    });

    if (!user) {
        return res.status(404).send("No user found");
    }

    delete user.password;
    res.json(user);
});

module.exports = router;

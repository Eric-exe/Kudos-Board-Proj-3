const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    let { authorId, boardId, content, gifUrl, signed } = req.body || undefined;
    authorId = parseInt(authorId);
    boardId = parseInt(boardId);
    const newCard = await prisma.Card.create({
        data: {
            authorId,
            boardId,
            content,
            signed,
            gifUrl,
            comments: {},
            likes: 0,
            usersLiked: {},
        },
    });
    res.json(newCard);
});


router.post("/like/:id", async (req, res) => {
    const id = parseInt(req.params.id) || undefined;
    const userId = parseInt(req.body.userId) || undefined;
    const isLiked = req.body.isLiked;

    if (id == undefined || userId == undefined || isLiked == undefined) {
        res.status(400).send("Bad id or userId or isLiked");
        return;
    }

    const card = await prisma.Card.findUnique({
        where: { id },
        include: { usersLiked: true },
    });

    const user = await prisma.User.findUnique({
        where: { id: userId },
    });

    if (!card || !user) {
        res.status(404).send("No card or user found");
        return;
    }

    if (card["usersLiked"].some((user) => user["id"] === userId) === isLiked) {
        res.status(409).send("Already liked or unliked");
        return;
    }

    const update = isLiked ? "connect" : "disconnect";
    const likeDelta = isLiked ? 1 : -1;

    await prisma.Card.update({
        where: { id },
        data: {
            likes: card["likes"] + likeDelta,
            usersLiked: {
                [update]: { id: userId },
            },
        },
    });

    await prisma.User.update({
        where: { id: userId },
        data: {
            cardsLiked: {
                [update]: { id },
            },
        },
    });
    res.json("Liked card");
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id) || undefined;
    const authorId = parseInt(req.body.authorId) || undefined;

    if (id == undefined) {
        res.status(400).send("Bad id");
        return;
    }

    const card = await prisma.Card.delete({
        where: { id, authorId },
    });

    if (card) {
        res.json(card);
    }
    else {
        res.status(404).send("No card found");
    }
});

module.exports = router;
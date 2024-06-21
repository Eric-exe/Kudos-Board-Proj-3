const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    const { authorId, title, imgUrl, category } = req.body;

    const newBoard = await prisma.Board.create({
        data: {
            authorId,
            title,
            imgUrl,
            category,
            cards: {},
        },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    });

    res.json(newBoard);
});

router.get("/", async (req, res) => {
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
                mode: "insensitive",
            },
        };
    }

    let boards = await prisma.Board.findMany({
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
        where: whereObj,
    });

    if (req.query.recent && req.query.recent == "true") {
        boards.sort((a, b) => b["id"] - a["id"]);
    }

    res.json(boards);
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id) || undefined;

    if (id == undefined) {
        res.status(400).send("Bad id");
        return;
    }

    const board = await prisma.Board.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                },
            },
            cards: {
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                    comments: {
                        include: {
                            author: {
                                select: {
                                    username: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (board) {
        // sort the cards by latest, so that liiking a card will not
        // mess up the order
        board["cards"].sort((a, b) => b["id"] - a["id"]);
        res.json(board);
    } else {
        res.status(404).send("No board found");
    }
});

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id) || undefined;
    const authorId = parseInt(req.body.authorId) || undefined;
    
    if (id == undefined) {
        res.status(400).send("Bad id");
        return;
    }

    // only allow deletion if author
    const board = await prisma.Board.delete({
        where: { id, authorId },
    });

    if (board) {
        res.json(board);
    } else {
        res.status(404).send("No board found");
    }
});

module.exports = router;

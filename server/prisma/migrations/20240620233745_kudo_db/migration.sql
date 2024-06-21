/*
  Warnings:

  - You are about to drop the `BoardCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BoardCard" DROP CONSTRAINT "BoardCard_authorId_fkey";

-- DropForeignKey
ALTER TABLE "BoardCard" DROP CONSTRAINT "BoardCard_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_cardId_fkey";

-- DropForeignKey
ALTER TABLE "_cardsDisliked" DROP CONSTRAINT "_cardsDisliked_A_fkey";

-- DropForeignKey
ALTER TABLE "_cardsLiked" DROP CONSTRAINT "_cardsLiked_A_fkey";

-- DropTable
DROP TABLE "BoardCard";

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "boardId" INTEGER NOT NULL,
    "signed" BOOLEAN NOT NULL,
    "content" TEXT NOT NULL,
    "gifUrl" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cardsLiked" ADD CONSTRAINT "_cardsLiked_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cardsDisliked" ADD CONSTRAINT "_cardsDisliked_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

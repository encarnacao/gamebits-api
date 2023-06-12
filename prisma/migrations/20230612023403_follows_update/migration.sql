/*
  Warnings:

  - You are about to drop the `follow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_follower_foreign";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_following_foreign";

-- DropTable
DROP TABLE "follow";

-- CreateTable
CREATE TABLE "follows" (
    "id" SERIAL NOT NULL,
    "following" INTEGER NOT NULL,
    "followed" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_foreign" FOREIGN KEY ("following") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followed_foreign" FOREIGN KEY ("followed") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

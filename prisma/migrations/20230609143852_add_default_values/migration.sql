/*
  Warnings:

  - Made the column `votes` on table `reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "games_tags" ALTER COLUMN "count" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "votes" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image_url" SET DEFAULT 'https://pbs.twimg.com/media/EhulGMdVoAIgBeN?format=png&name=small';

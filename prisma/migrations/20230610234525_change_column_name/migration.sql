/*
  Warnings:

  - You are about to drop the column `cover_id` on the `games` table. All the data in the column will be lost.
  - Added the required column `cover_url` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "cover_id",
ADD COLUMN     "cover_url" VARCHAR(255) NOT NULL;

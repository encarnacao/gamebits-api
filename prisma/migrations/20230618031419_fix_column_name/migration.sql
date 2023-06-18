/*
  Warnings:

  - You are about to drop the column `original_realease_date` on the `games` table. All the data in the column will be lost.
  - Added the required column `original_release_date` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "original_realease_date",
ADD COLUMN     "original_release_date" DATE NOT NULL;

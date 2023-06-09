/*
  Warnings:

  - Added the required column `igdb_id` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "igdb_id" INTEGER NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[igdb_id]` on the table `games` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "games_igdb_id_key" ON "games"("igdb_id");

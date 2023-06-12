/*
  Warnings:

  - Added the required column `wishlist` to the `libraries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "libraries" ADD COLUMN     "completion_time" DECIMAL(3,1),
ADD COLUMN     "wishlist" BOOLEAN NOT NULL;

/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Dish` table. All the data in the column will be lost.
  - Added the required column `image` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "imageUrl",
ADD COLUMN     "image" TEXT NOT NULL;

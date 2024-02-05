/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_phoneNumber_key" ON "Restaurant"("phoneNumber");

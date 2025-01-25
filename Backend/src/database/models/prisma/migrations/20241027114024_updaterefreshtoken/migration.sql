/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `refreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "refreshToken_userId_key" ON "refreshToken"("userId");

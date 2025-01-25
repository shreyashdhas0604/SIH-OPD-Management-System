/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hospital_id_key" ON "Hospital"("id");

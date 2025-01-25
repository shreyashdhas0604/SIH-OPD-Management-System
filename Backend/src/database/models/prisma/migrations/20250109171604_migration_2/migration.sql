/*
  Warnings:

  - A unique constraint covering the columns `[uniqueIdentifier]` on the table `Timeslot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueIdentifier` to the `Timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timeslot" ADD COLUMN     "uniqueIdentifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Timeslot_uniqueIdentifier_key" ON "Timeslot"("uniqueIdentifier");

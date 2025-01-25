/*
  Warnings:

  - Added the required column `hospitalID` to the `Bed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "BedStatus" ADD VALUE 'Maintenance';

-- AlterTable
ALTER TABLE "Bed" ADD COLUMN     "hospitalID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_hospitalID_fkey" FOREIGN KEY ("hospitalID") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

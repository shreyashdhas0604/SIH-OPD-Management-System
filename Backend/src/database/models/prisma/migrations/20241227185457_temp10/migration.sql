/*
  Warnings:

  - A unique constraint covering the columns `[bedID]` on the table `OPDRegistration` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_registrationID_fkey";

-- AlterTable
ALTER TABLE "OPDRegistration" ADD COLUMN     "bedID" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "OPDRegistration_bedID_key" ON "OPDRegistration"("bedID");

-- AddForeignKey
ALTER TABLE "OPDRegistration" ADD CONSTRAINT "OPDRegistration_bedID_fkey" FOREIGN KEY ("bedID") REFERENCES "Bed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

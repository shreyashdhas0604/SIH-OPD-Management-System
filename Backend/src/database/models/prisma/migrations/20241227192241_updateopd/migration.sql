/*
  Warnings:

  - Made the column `doctorID` on table `OPDRegistration` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OPDRegistration" ALTER COLUMN "doctorID" SET NOT NULL;

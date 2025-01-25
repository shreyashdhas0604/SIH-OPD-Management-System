/*
  Warnings:

  - Added the required column `departmentID` to the `OPDRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalID` to the `OPDRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OPDRegistration" ADD COLUMN     "departmentID" INTEGER NOT NULL,
ADD COLUMN     "hospitalID" INTEGER NOT NULL;

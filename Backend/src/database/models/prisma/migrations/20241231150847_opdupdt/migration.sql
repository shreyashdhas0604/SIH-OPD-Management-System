/*
  Warnings:

  - Added the required column `OPDTime` to the `OPDRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OPDRegistration" ADD COLUMN     "OPDTime" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `address` on the `OPDRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `OPDRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `OPDRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `disabilityStatus` on the `OPDRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `OPDRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `insuranceCard` on the `OPDRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `permanentIllness` on the `OPDRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `rationCard` on the `OPDRegistration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OPDRegistration" DROP COLUMN "address",
DROP COLUMN "age",
DROP COLUMN "contactNumber",
DROP COLUMN "disabilityStatus",
DROP COLUMN "gender",
DROP COLUMN "insuranceCard",
DROP COLUMN "permanentIllness",
DROP COLUMN "rationCard";

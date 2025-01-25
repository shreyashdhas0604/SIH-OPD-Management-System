/*
  Warnings:

  - Added the required column `date` to the `OPDRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `OPDRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OPDRegistration" ADD COLUMN     "PaymentStatus" "PaymentStatus" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "diagnosis" TEXT,
ADD COLUMN     "prescription" TEXT,
ADD COLUMN     "symptoms" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

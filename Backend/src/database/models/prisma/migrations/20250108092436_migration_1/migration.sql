/*
  Warnings:

  - Added the required column `updatedAt` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OPDRegistration" DROP CONSTRAINT "OPDRegistration_departmentID_fkey";

-- DropForeignKey
ALTER TABLE "OPDRegistration" DROP CONSTRAINT "OPDRegistration_hospitalID_fkey";

-- DropForeignKey
ALTER TABLE "OPDRegistration" DROP CONSTRAINT "OPDRegistration_patientID_fkey";

-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "timeSlots" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "OPDRegistration" ALTER COLUMN "doctorID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "OPDRegistration" ADD CONSTRAINT "OPDRegistration_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OPDRegistration" ADD CONSTRAINT "OPDRegistration_departmentID_fkey" FOREIGN KEY ("departmentID") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OPDRegistration" ADD CONSTRAINT "OPDRegistration_hospitalID_fkey" FOREIGN KEY ("hospitalID") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

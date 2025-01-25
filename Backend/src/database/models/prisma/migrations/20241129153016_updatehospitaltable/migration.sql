/*
  Warnings:

  - Added the required column `speciality` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timings` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalBeds` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPersonsPerSlot` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "hospitalImageUrl" TEXT[],
ADD COLUMN     "speciality" TEXT NOT NULL,
ADD COLUMN     "timeslots" TEXT[],
ADD COLUMN     "timings" TEXT NOT NULL,
ADD COLUMN     "totalBeds" INTEGER NOT NULL,
ADD COLUMN     "totalPersonsPerSlot" INTEGER NOT NULL,
ALTER COLUMN "isVerified" SET DEFAULT 'Pending',
ALTER COLUMN "isVerified" SET DATA TYPE TEXT;

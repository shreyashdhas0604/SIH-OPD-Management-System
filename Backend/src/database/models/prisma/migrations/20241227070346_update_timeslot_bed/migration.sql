/*
  Warnings:

  - You are about to drop the column `timeslots` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `PaymentStatus` on the `OPDRegistration` table. All the data in the column will be lost.
  - You are about to drop the `refreshToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "timeslots";

-- AlterTable
ALTER TABLE "OPDRegistration" DROP COLUMN "PaymentStatus",
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'Pending';

-- DropTable
DROP TABLE "refreshToken";

-- CreateTable
CREATE TABLE "BedAvailability" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "bedID" INTEGER NOT NULL,

    CONSTRAINT "BedAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timeslot" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "availableCount" INTEGER NOT NULL,
    "hospitalID" INTEGER NOT NULL,

    CONSTRAINT "Timeslot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_key" ON "RefreshToken"("userId");

-- AddForeignKey
ALTER TABLE "BedAvailability" ADD CONSTRAINT "BedAvailability_bedID_fkey" FOREIGN KEY ("bedID") REFERENCES "Bed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timeslot" ADD CONSTRAINT "Timeslot_hospitalID_fkey" FOREIGN KEY ("hospitalID") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

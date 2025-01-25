-- AlterTable
ALTER TABLE "OPDRegistration" ADD COLUMN     "address" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "age" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "allergies" TEXT,
ADD COLUMN     "bloodGroup" TEXT,
ADD COLUMN     "contactNumber" TEXT NOT NULL DEFAULT '00-0000-0000',
ADD COLUMN     "disabilityStatus" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "insuranceCard" TEXT,
ADD COLUMN     "permanentIllness" TEXT,
ADD COLUMN     "rationCard" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION DEFAULT 0.0,
ALTER COLUMN "departmentID" DROP NOT NULL;

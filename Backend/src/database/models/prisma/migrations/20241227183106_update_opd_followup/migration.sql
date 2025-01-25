-- AlterTable
ALTER TABLE "OPDRegistration" ADD COLUMN     "followUp" BOOLEAN DEFAULT false,
ADD COLUMN     "followUpDate" TIMESTAMP(3),
ADD COLUMN     "followUpDiagnosis" TEXT,
ADD COLUMN     "followUpPrescription" TEXT,
ADD COLUMN     "followUpReason" TEXT;

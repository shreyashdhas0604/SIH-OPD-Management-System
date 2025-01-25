-- DropForeignKey
ALTER TABLE "OPDRegistration" DROP CONSTRAINT "OPDRegistration_patientID_fkey";

-- AddForeignKey
ALTER TABLE "OPDRegistration" ADD CONSTRAINT "OPDRegistration_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OPDRegistration" ADD CONSTRAINT "OPDRegistration_departmentID_fkey" FOREIGN KEY ("departmentID") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OPDRegistration" ADD CONSTRAINT "OPDRegistration_hospitalID_fkey" FOREIGN KEY ("hospitalID") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

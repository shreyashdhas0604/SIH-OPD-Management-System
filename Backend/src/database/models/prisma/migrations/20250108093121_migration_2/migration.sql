-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_hospitalID_fkey";

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_hospitalID_fkey" FOREIGN KEY ("hospitalID") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "OPDRegistration" ADD COLUMN     "VirtualOPDDate" TIMESTAMP(3),
ADD COLUMN     "VirtualOPDLink" TEXT,
ADD COLUMN     "VirtualOPDRoomName" TEXT,
ADD COLUMN     "VirtualOPDTime" TEXT,
ADD COLUMN     "isVirtualOPD" BOOLEAN DEFAULT false;

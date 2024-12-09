-- AlterTable
ALTER TABLE "User" ADD COLUMN     "connection" TEXT[] DEFAULT ARRAY[]::TEXT[];

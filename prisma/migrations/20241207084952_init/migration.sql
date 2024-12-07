/*
  Warnings:

  - You are about to drop the column `menteeId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `mentorId` on the `Match` table. All the data in the column will be lost.
  - Added the required column `receiverUsername` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderUsername` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_menteeId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_mentorId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "menteeId",
DROP COLUMN "mentorId",
ADD COLUMN     "isMentee" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "receiverUsername" TEXT NOT NULL,
ADD COLUMN     "senderUsername" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_senderUsername_fkey" FOREIGN KEY ("senderUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_receiverUsername_fkey" FOREIGN KEY ("receiverUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

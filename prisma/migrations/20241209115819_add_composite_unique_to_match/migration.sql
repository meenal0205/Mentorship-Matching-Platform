/*
  Warnings:

  - The values [COMPLETED] on the enum `MatchStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[senderUsername,receiverUsername]` on the table `Match` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MatchStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
ALTER TABLE "Match" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Match" ALTER COLUMN "status" TYPE "MatchStatus_new" USING ("status"::text::"MatchStatus_new");
ALTER TYPE "MatchStatus" RENAME TO "MatchStatus_old";
ALTER TYPE "MatchStatus_new" RENAME TO "MatchStatus";
DROP TYPE "MatchStatus_old";
ALTER TABLE "Match" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "Match_senderUsername_receiverUsername_key" ON "Match"("senderUsername", "receiverUsername");

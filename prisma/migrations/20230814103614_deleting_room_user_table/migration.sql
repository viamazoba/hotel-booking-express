/*
  Warnings:

  - You are about to drop the `Room_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roomId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room_user" DROP CONSTRAINT "Room_user_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Room_user" DROP CONSTRAINT "Room_user_userId_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roomId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Room_user";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

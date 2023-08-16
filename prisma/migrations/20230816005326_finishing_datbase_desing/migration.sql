/*
  Warnings:

  - You are about to drop the column `inclusion_name` on the `Amenity_room` table. All the data in the column will be lost.
  - You are about to drop the column `new_price` on the `Booked_room` table. All the data in the column will be lost.
  - You are about to drop the column `previous_price` on the `Booked_room` table. All the data in the column will be lost.
  - You are about to drop the column `room_img` on the `Booked_room` table. All the data in the column will be lost.
  - You are about to drop the column `room_name` on the `Booked_room` table. All the data in the column will be lost.
  - You are about to drop the column `check_in` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `check_out` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[amenity_name]` on the table `Amenity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inclusion_name]` on the table `Inclusion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `Booked_room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booked_roomId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityId_fkey";

-- DropIndex
DROP INDEX "Amenity_room_inclusion_name_key";

-- AlterTable
ALTER TABLE "Amenity_room" DROP COLUMN "inclusion_name";

-- AlterTable
ALTER TABLE "Booked_room" DROP COLUMN "new_price",
DROP COLUMN "previous_price",
DROP COLUMN "room_img",
DROP COLUMN "room_name",
ADD COLUMN     "roomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "check_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "check_out" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "check_in",
DROP COLUMN "check_out",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roomId",
ADD COLUMN     "booked_roomId" TEXT NOT NULL,
ADD COLUMN     "login_type" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "user_name" DROP NOT NULL,
ALTER COLUMN "user_img" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "cityId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Amenity_amenity_name_key" ON "Amenity"("amenity_name");

-- CreateIndex
CREATE UNIQUE INDEX "Inclusion_inclusion_name_key" ON "Inclusion"("inclusion_name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booked_room" ADD CONSTRAINT "Booked_room_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

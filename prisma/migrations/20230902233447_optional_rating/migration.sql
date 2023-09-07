/*
  Warnings:

  - You are about to drop the column `hotelId` on the `City` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_hotelId_fkey";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "hotelId";

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "cityId" TEXT NOT NULL,
ALTER COLUMN "hotel_rating" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

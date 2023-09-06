/*
  Warnings:

  - You are about to drop the column `hotel_imgs` on the `Hotel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "hotel_imgs",
ADD COLUMN     "imgs" TEXT[];

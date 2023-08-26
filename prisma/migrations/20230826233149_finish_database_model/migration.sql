/*
  Warnings:

  - The values [Man,Woman,Other] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `hotel_type` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the `City_hotel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hotelId` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotel_rating` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('man', 'woman', 'other');
ALTER TABLE "User" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "City_hotel" DROP CONSTRAINT "City_hotel_cityId_fkey";

-- DropForeignKey
ALTER TABLE "City_hotel" DROP CONSTRAINT "City_hotel_hotelId_fkey";

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "hotelId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "hotel_type",
DROP COLUMN "status",
ADD COLUMN     "hotel_rating" "Stars" NOT NULL,
ADD COLUMN     "labels" TEXT;

-- DropTable
DROP TABLE "City_hotel";

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `guests` on the `Room` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Man', 'Woman', 'Other');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "guests",
ADD COLUMN     "max_guests" INTEGER,
ALTER COLUMN "previous_price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Inclusion_room" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "inclusionId" TEXT NOT NULL,

    CONSTRAINT "Inclusion_room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inclusion" (
    "id" TEXT NOT NULL,
    "inclusion_name" TEXT NOT NULL,

    CONSTRAINT "Inclusion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity_room" (
    "id" TEXT NOT NULL,
    "inclusion_name" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "amenityId" TEXT NOT NULL,

    CONSTRAINT "Amenity_room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL,
    "amenity_name" TEXT NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room_user" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Room_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_img" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthday" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booked_room" (
    "id" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,
    "room_img" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "new_price" INTEGER NOT NULL,
    "previous_price" INTEGER,
    "check_in" TIMESTAMP(3) NOT NULL,
    "check_out" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Booked_room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City_hotel" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "City_hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name_city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "altitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "country_name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service_label_hotel" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "service_labelId" TEXT NOT NULL,

    CONSTRAINT "Service_label_hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service_label" (
    "id" TEXT NOT NULL,
    "service_label_name" TEXT NOT NULL,

    CONSTRAINT "Service_label_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Amenity_room_inclusion_name_key" ON "Amenity_room"("inclusion_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "City_postal_code_key" ON "City"("postal_code");

-- AddForeignKey
ALTER TABLE "Inclusion_room" ADD CONSTRAINT "Inclusion_room_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inclusion_room" ADD CONSTRAINT "Inclusion_room_inclusionId_fkey" FOREIGN KEY ("inclusionId") REFERENCES "Inclusion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Amenity_room" ADD CONSTRAINT "Amenity_room_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Amenity_room" ADD CONSTRAINT "Amenity_room_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room_user" ADD CONSTRAINT "Room_user_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room_user" ADD CONSTRAINT "Room_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booked_room" ADD CONSTRAINT "Booked_room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City_hotel" ADD CONSTRAINT "City_hotel_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City_hotel" ADD CONSTRAINT "City_hotel_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service_label_hotel" ADD CONSTRAINT "Service_label_hotel_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service_label_hotel" ADD CONSTRAINT "Service_label_hotel_service_labelId_fkey" FOREIGN KEY ("service_labelId") REFERENCES "Service_label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

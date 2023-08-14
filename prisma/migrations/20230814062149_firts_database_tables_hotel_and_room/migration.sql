-- CreateEnum
CREATE TYPE "Stars" AS ENUM ('one', 'two', 'three', 'four', 'five');

-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
    "hotel_name" TEXT NOT NULL,
    "hotel_img" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "new_price" INTEGER NOT NULL,
    "previous_price" INTEGER,
    "phone" TEXT NOT NULL,
    "hotel_type" "Stars" NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,
    "room_img" TEXT NOT NULL,
    "new_price" INTEGER NOT NULL,
    "previous_price" INTEGER NOT NULL,
    "guests" INTEGER NOT NULL,
    "check_in" TIMESTAMP(3) NOT NULL,
    "check_out" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_hotel_name_key" ON "Hotel"("hotel_name");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { Room as RoomModel} from "@prisma/client";

export type Room = RoomModel;

export type CreateRoomData = Omit<RoomModel, 'id'|'Amenity_room'|'Booked_room'>;

export type editCreateRoomData = Omit<CreateRoomData, 'hotelId'>;
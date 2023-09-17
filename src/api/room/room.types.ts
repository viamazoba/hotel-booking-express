import { Room as RoomModel} from "@prisma/client";

export type Room = RoomModel;

export type CreateRoomData = Omit<RoomModel, 'id'|'Booked_room'>;

export type editCreateRoomData = Omit<CreateRoomData, 'hotelId'>;
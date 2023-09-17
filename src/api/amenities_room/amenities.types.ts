import { Amenity_room as Amenity_roomModel  } from "@prisma/client";

export type Amenity_room = Amenity_roomModel;

export type CreateAmenitiesData = Omit<Amenity_roomModel, 'id'>
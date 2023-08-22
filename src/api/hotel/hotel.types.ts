import { Hotel as HotelModel} from "@prisma/client";

export type Hotel = HotelModel;

export type CreateHotelData = Omit<HotelModel, 'id'>;


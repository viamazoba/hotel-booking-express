import { Hotel as HotelModel} from "@prisma/client";

export type Hotel = HotelModel;

export type CreateHotelData = Omit<HotelModel, 'id'|'check_in'|'check_out'|'Service_labels_hotel'|'imgs'>;


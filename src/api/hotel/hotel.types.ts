import { Hotel as HotelModel} from "@prisma/client";



/*export interface HotelModel{
    id: string;
    hotel_name: string;               
    hotel_img: string;          
    description: string;          
    new_price: number;            
    previous_price: number;
    status: string;          
    phone: string;                
    hotel_type: string;
    check_in: Date;           
    check_out: Date;
    rooms: any;     //preguntar
    City_hotel: any; 
    Service_labels_hotel: any;
}*/

export type Hotel = HotelModel;

export type CreateHotelData = Omit<HotelModel, 'id'>;


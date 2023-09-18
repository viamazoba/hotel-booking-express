import { faker } from '@faker-js/faker';

export const getCitySeeder = () => ({
    name_city: faker.location.city() ,
    postal_code: faker.location.zipCode() ,
    altitude: faker.location.longitude(),
    latitude: faker.location.latitude(),
});

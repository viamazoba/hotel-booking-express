import { faker } from '@faker-js/faker';
export const getCountrySeeder = () => ({
    country_name: faker.location.country()
});

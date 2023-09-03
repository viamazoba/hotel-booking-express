import { faker } from '@faker-js/faker';

export const getRoomsSeeder = () => ({
    room_name: faker.company.name(),
    room_img: faker.image.urlLoremFlickr(),
    new_price: faker.number.int({ max: 100 }),
    previous_price: faker.number.int({ max: 100 }),
    max_guests: 3,
})

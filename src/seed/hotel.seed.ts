import { faker } from '@faker-js/faker';

export const getHotelSeeder = () => ({
    hotel_name: faker.company.name(),
    hotel_img: faker.image.urlLoremFlickr(),
    imgs: faker.helpers.multiple(()=>faker.image.urlLoremFlickr(), {
      count: 5,
    }),
    description: faker.lorem.paragraphs(),
    new_price: faker.number.int({ max: 100 }),
    previous_price: faker.number.int({ max: 100 }),
    labels: faker.commerce.productAdjective(),
    phone: faker.phone.number(),
    check_in: new Date(),
    check_out: new Date(),
  });

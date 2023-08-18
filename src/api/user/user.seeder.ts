import { faker } from '@faker-js/faker';

// CJS
// const { faker } = require('@faker-js/faker');

export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(), //
    user_img: faker.image.avatar(), //
    email: faker.internet.email(), //
    phone: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

// export const userSeeder = createRandomUser()

export const userSeeder = faker.helpers.multiple(createRandomUser, {
  count: 5,
})
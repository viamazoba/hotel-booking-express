# The Powerhouse Fueling the Hotel Booking Experience 🏨

The success of our hotel booking application hinges on a harmonious blend of cutting-edge technologies, working seamlessly together to provide an exceptional user journey. Let's delve into the pivotal components and witness their collaborative brilliance:

## The Heart of the Operation
At the core of our application lies the backend, the mastermind that orchestrates it all. Powered by Node.js, it empowers us to execute JavaScript code on the server, enabling real-time handling of hotel booking requests and swift data delivery to our users.

## A Flexible Framework
To shape our backend infrastructure, we rely on Express.js—a robust framework tailor-made for efficient management of web and mobile requests. It seamlessly tackles every aspect of our application, from user authentication to the intricate dance of booking management.

## Fort Knox-Level Security
Security stands as an unwavering sentinel guarding user data. We employ Bcrypt, a formidable guardian that encrypts passwords before they take residence in our database. This ensures that passwords remain impenetrable fortresses, repelling unauthorized access attempts.

## Identity and Access Control
We grant access to the privileged few by wielding the power of JSON Web Tokens (JWT). When a guest registers or logs in, a JWT springs to life, akin to a digital "keycard" that unlocks doors to subsequent interactions.

## Prisma: The Data Maestro
Prisma, our behind-the-scenes virtuoso, waltzes effortlessly with the PostgreSQL database. Picture Prisma as a sculptor of data, meticulously carving out the storage and retrieval of hotel and booking information.

## Key Components in Harmony
- **User Registration and Authentication**: Guests registering or logging in find their passwords meticulously cloaked by Bcrypt's veil of secrecy. Subsequently, a JWT ushers them into a world of uninterrupted access.

- **APIs: The Backbone of Communication**: Our hotel booking application and backend converse through a meticulously crafted network of "routes" and "access points." This network facilitates actions such as guest registration, booking management, and the exploration of hotels and rooms.

- **Data Fortification with PostgreSQL**: As the fortress where we safeguard critical hotel and booking data, PostgreSQL stands tall. Prisma, our trusted aide, streamlines interactions with the database, simplifying data addition, updates, and retrieval.

- **Cloud-Powered Accessibility**: To ensure uninterrupted accessibility, we nestle our backend in the cloud, guaranteeing that guests and our application can engage at any time.

## Embark on Your Odyssey
If you're keen on joining us in shaping the future of hotel booking, here's your roadmap:

1. **Unearth the Code**: Begin your journey by delving into the repository housing the hotel booking application's code.

2. **Gear Up with Dependencies**: Equip yourself by running `npm install` to install the arsenal of tools and components vital for the server's operation.

3. **Configuring Your Environment**: Copy the `.env.example` configuration file and personalize it with the essential information.

4. **Navigating Migrations and Data Generation**: Seamlessly navigate database management with commands such as `npx prisma migrate dev` for database control and `npx prisma generate` for generating Prisma clients.

5. **Initiate Your Quest**: Embark on your journey by firing up the development server with `npm run dev`.

With these steps, our backend will be primed to support the hotel booking application, offering features ranging from guest registration and authentication to booking management and the exploration of hotels and rooms. Welcome to your next adventure in the realm of hotel reservations!

## API Routes (Partial Listing)
```javascript
const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter);
  app.use('/api/user', userRouter);
  app.use('/api/hotel', hotelRouter);
  app.use('/api/room', roomRouter);
  app.use('/api/inclusion_room', inclusionRoomRouter);
  app.use('/api/amenities_room', amenityRoomRouter);
  // Authentication
  app.use('/auth/local', authLocalRouter);
  app.use('/api/payment', paymentRouter);
};

export default routes;
```


## Contributors

We would like to thank the following individuals for their contributions to this project:

- [Natalia Chavarria](https://github.com/Nataliachm)
- [Victor Mazo](https://github.com/viamazoba)
- [Fabian Mendoza](https://github.com/facamesi52)

Thank you all for your hard work and contributions!
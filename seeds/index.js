const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '646c9be92a41593e04f538be',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed a tenetur, rem quisquam ad repellendus, delectus magnam dolores consequatur alias beatae atque. Atque sit nam incidunt quibusdam! Voluptates, enim dignissimos!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dkjun6glm/image/upload/v1684919046/YelpCamp/uxuhbpa0yiedeem21us6.jpg',
                    filename: 'YelpCamp/uxuhbpa0yiedeem21us6',
                },
                {
                    url: 'https://res.cloudinary.com/dkjun6glm/image/upload/v1684919044/YelpCamp/bvapkolyqbdqz4ditme1.jpg',
                    filename: 'YelpCamp/bvapkolyqbdqz4ditme1',
                },
                {
                    url: 'https://res.cloudinary.com/dkjun6glm/image/upload/v1684919043/YelpCamp/aezrkoj0skqn0an5f3th.jpg',
                    filename: 'YelpCamp/aezrkoj0skqn0an5f3th',
                }

            ]

        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
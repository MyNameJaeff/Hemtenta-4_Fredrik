const express = require("express");
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient()

const app = express(); // Creates the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* app.use(routes); */

const getDate = () => { // Returns the date in the format: "Day, Date Month Year Week WeekNumber"
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "December"];
    const date = new Date();

    const day = days[date.getDay()];
    const month = months[date.getMonth()];

    startDate = new Date(date.getFullYear(), 0, 1);
    let daysGone = Math.floor((date - startDate) /
        (24 * 60 * 60 * 1000) + 1); // +1 because it starts at 1 not 0

    let weekNumber = Math.ceil(daysGone / 7);

    const fullDate = `${day}, ${date.getDate()} ${month} ${date.getFullYear()} || Week ${weekNumber}`;
    return fullDate;
}

const getLocations = async () => { // Returns the location of the first result from the search
    try {
        const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct?q=Flemmingsberg&limit=5&appid=7285fa6b5bfe84a02e4ebf60e8efb9ce');
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

const getWeather = async () => { // Returns the weather of the first result from the search
    try {
        let location = "";
        await getLocations().then(data => {
            location = (data[0]);
        });
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=7285fa6b5bfe84a02e4ebf60e8efb9ce`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

app.get("/api", (req, res) => { // Returns the weather and date
    let date = getDate();
    getWeather().then(data => {
        res.json({ weather: data, currDate: date });
    });
});

app.post("/api/book", (req, res) => { // Books a meeting
    const { name, email, date, time } = req.body;
    const fullDate = Date.parse(`${date} ${time}`);
    console.log(fullDate);
    const reformedDate = new Date(fullDate);
    console.log(reformedDate);
    console.log(name, email, date, time);
    /* prisma.booking.create({
        data: {
            name: name,
            email: email,
            date: date,
            time: time
        }
    }); */
    res.json({ message: "Booked a meeting" });
});

app.listen(PORT, () => { // Starts the server
    console.log(`Server listening on ${PORT}`);
});
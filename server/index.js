const express = require("express");
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient()

const app = express(); // Creates the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

prisma.available.create({
    data: {
        isAvailable: true
    }
})
    .catch(err => {
        console.log(err);
    });

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

function addHours(date, hours) {
    const hoursToAdd = hours * 60 * 60 * 1000;
    date.setTime(date.getTime() + hoursToAdd);
    return date;
}

app.get("/api", (req, res) => { // Returns the weather and date
    let date = getDate();
    getWeather().then(data => {
        res.json({ weather: data, currDate: date });
    });
});

app.post("/api/book", async (req, res) => { // Books a meeting
    const { name, email, date, time } = req.body;
    const fullDate = Date.parse(`${date} ${time}`);

    var reformedDate = new Date(fullDate);
    reformedDate = addHours(reformedDate, 1);

    await prisma.booking.create({
        data: {
            name: name,
            email: email,
            bookedTime: reformedDate
        }
    })
        .catch(err => {
            console.log(err);
        });

    console.log("Booked a meeting\n");
    res.json({ booked: true });
});

app.get("/api/bookings", async (req, res) => { // Returns all bookings
    const bookings = await prisma.booking.findMany();
    res.json(bookings);
});

app.post("/api/remove", async (req, res) => { // Removes a booking
    let { id } = req.body;
    id = parseInt(id);
    await prisma.booking.delete({
        where: {
            id: id
        }
    })
        .catch(err => {
            console.log(err);
        });

    console.log("Removed a meeting\n");
    res.json({ removed: true });
});

app.post("/api/edit", async (req, res) => { // Edits a booking
    let { id, name, email, date, time } = req.body;
    const fullDate = Date.parse(`${date} ${time}`);

    var reformedDate = new Date(fullDate);
    reformedDate = addHours(reformedDate, 1);

    id = parseInt(id);

    await prisma.booking.update({
        where: {
            id: id
        },
        data: {
            name: name,
            email: email,
            bookedTime: reformedDate
        }
    })
        .catch(err => {
            console.log(err);
        });

    console.log("Edited a meeting\n");
    res.json({ edited: true });
});

app.get("/api/avaiability", async (req, res) => { // Returns the avaiability of the meeting room")
    let isAvailable = await prisma.available.findFirst();

    res.json({ avaiability: isAvailable });
});

app.post("/api/avaiability", async (req, res) => { // Changes the avaiability
    const isAvailable = req.body.isAvailable;

    await prisma.available.update({
        where: {
            id: 1
        },
        data: {
            isAvailable: isAvailable
        }
    })
        .catch(err => {
            console.log(err);
        });

    console.log("Changed avaiability\n");
});


app.listen(PORT, () => { // Starts the server
    console.log(`Server listening on ${PORT}\n`);
});
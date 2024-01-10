import React, { useState } from "react";
import axios from "axios";

const Book = (props) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (event) => {
    // Updates the form
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isBooked = false;
    await axios
      .get("/api/bookings") // Checks if the time is already booked
      .then((res) => {
        console.log(res.data);
        let tryDate = form.date + "T" + form.time + ":00.000Z";
        let minutes = parseInt(form.time.split(":")[1]);
        res.data.forEach((booking) => {
          if (booking.bookedTime === tryDate ) {
            alert("This time is already booked");
            isBooked = true;
            return;
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
    if (!isBooked) {
      // Books the time if it's not already booked
      await axios
        .post("/api/book", form)
        .then((res) => {
          setForm({
            // Resets the form
            name: "",
            email: "",
            date: "",
            time: "",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="book">
      <form action="" method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={handleChange}
            value={form.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
            value={form.email}
          />
        </div>
        <div>
          <label htmlFor="date">Date and time:</label>
          <div className="timeInputs">
            <input
              type="date"
              id="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              required
              onChange={handleChange}
              value={form.date}
            />
            <input
              type="time"
              id="time"
              name="time"
              required
              onChange={handleChange}
              step="3600"
              value={form.time}
            />
          </div>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Book;

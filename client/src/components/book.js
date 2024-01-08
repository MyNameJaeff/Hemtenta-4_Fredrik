import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Book = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        date: '',
        time: ''
    });

    const navigator = useNavigate();

    const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        setForm((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(form);
        await axios.post('/api/book', form)
            .then(res => {
                navigator('/');
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div className="book">
            <form action="" method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="date">Date and time:</label>
                    <div className="timeInputs">
                        <input type="date" id="date" name="date" min={new Date().toISOString().split("T")[0]} required onChange={handleChange} />
                        <input type="time" id="time" name="time" required onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}


export default Book;
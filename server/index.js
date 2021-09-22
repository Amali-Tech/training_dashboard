const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

// create a user
app.post("/users", async(req, res) => {
    try{
        let { email, password, isActive, isAdmin } = req.body;
        isActive === 1 ? true : false;
        isAdmin === 1 ? true : false;
        const newUser = await pool.query("INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING *", 
        [email, password, isActive, isAdmin]);

        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


// get a user
app.get("/users/:email", async(req, res) => {
    try{
        const { email } = req.params;
        const allUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        res.json(allUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


// get all users
app.get("/users", async(req, res) => {
    try{
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// update a user


// delete a user
app.delete("/users/:email", async(req, res) => {
    try{
        const { email } = req.params;
        const allUser = await pool.query("DELETE FROM users WHERE email = $1", [email]);
        res.json("User deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
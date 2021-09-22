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

// reset password
app.put("/users/reset/:email", async(req, res) => {
    try{
        const { password } = req.body;
        const { email } = req.params;
        const resetPassword = await pool.query("UPDATE users SET password = $1 WHERE email = $2", [password, email]);

        res.json("Password reset done");
    } catch(err) {
        console.error(err.message);
    }
});


// update user status
app.put("/users/:email", async(req, res) => {
    try{
        let { isActive } = req.body;
        const { email } = req.params;

        isActive === 1 ? true : false;

        const modifyUser = await pool.query("UPDATE users SET isactive = $1 WHERE email = $2", [isActive, email]);

        res.json("User has been updated");
    } catch(err) {
        console.error(err.message);
    }
});

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
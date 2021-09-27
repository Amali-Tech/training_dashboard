const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');

// middleware
app.use(cors());
app.use(express.json());

// token
let verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    // check if bearer is sent
    if(typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.json({
            status: "failure",
            message: "Token missing in header"
        });
    }
}

// ROUTES

// create a user
app.post("/users", async(req, res, next) => {
    try{
        let { email, password, isActive, isAdmin } = req.body;
        isActive === 1 ? true : false;
        isAdmin === 1 ? true : false;
        password = bcrypt.hashSync(password, 12);
        const newUser = await pool.query("INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING *", 
        [email, password, isActive, isAdmin]);

        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.json({
            status: "failure",
            message: "Error creating user."
        });
    }
});


// get a user
app.get("/users/:email", async(req, res, next) => {
    try{
        const { email } = req.params;
        const allUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        res.json(allUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.json({
            status: "failure",
            message: "Error retreiving user."
        });
    }
});


// get all users
app.get("/users", async(req, res, next) => {
    try{
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
        res.json({
            status: "failure",
            message: "Error retreiving users."
        });
    }
});

// reset password
app.put("/users/reset/:email", async(req, res, next) => {
    try{
        let { password } = req.body;
        password = bcrypt.hashSync(password, 12);
        const { email } = req.params;
        const resetPassword = await pool.query("UPDATE users SET password = $1 WHERE email = $2", [password, email]);

        res.json({
            status: "success",
            message: "Password reset success"
        });
    } catch(err) {
        console.error(err.message);
        res.json({
            status: "failure",
            message: "Error reseting password."
        });
    }
});


// update user status
app.put("/users/:email", async(req, res, next) => {
    try{
        let { isActive } = req.body;
        const { email } = req.params;

        isActive === 1 ? true : false;

        const modifyUser = await pool.query("UPDATE users SET isactive = $1 WHERE email = $2", [isActive, email]);

        res.json({
            status: "success",
            message: "User updated"
        });
    } catch(err) {
        console.error(err.message);
        res.json({
            status: "failure",
            message: "Error updating user."
        });
    }
});

// delete a user
app.delete("/users/:email", async(req, res, next) => {
    try{
        const { email } = req.params;
        const allUser = await pool.query("DELETE FROM users WHERE email = $1", [email]);
        res.json({
            status: "success",
            message: "User deleted"
        });
    } catch (err) {
        console.error(err.message);
        res.json({
            status: "failure",
            message: "Error deleting user."
        });
    }
});

// upload csv
app.post("/upload", async(req, res, next) => {
    try{
        // truncate table
        const truncateTable = await pool.query("TRUNCATE TABLE trainee");

        const recordCount = await pool.query("SELECT * from trainee;");

        if(recordCount.rowCount === 0){
            
            let itemCount = 0;
            for (item of req.body) {
                
                const { email, name, specialization, mentor, entry_year, reg_score, resp_score, rel_score } = item
                // console.log(specialization);
                
                const insertRecord = await pool.query(
                    "INSERT INTO trainee (email, name, specialization, mentor, entry_year, regularity_score,responsive_score, reliability_score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
                    [email, name, specialization, mentor, entry_year, reg_score, resp_score, rel_score]);
                itemCount = itemCount + 1;
            }

            res.json({
                status: "success",
                message: itemCount + " records inserted"
            });
        } 
        else {
            res.json({
                status: "failure",
                message: "Error updating the database."
            });
        }
    } catch(err) {
        console.error(err.message);
        res.json({
            status: "failure",
            message: "Error updating the database."
        });
    }
});


// get trainee marks
app.get("/trainee/:email", async(req, res, next) => {
    try{
        const { email } = req.params;

        const traineeDetails = await pool.query("SELECT * FROM trainee WHERE email = $1", [email]);
        res.json({
            status: "success",
            message: traineeDetails.rows[0]
        });
    } catch(err) {
        console.error(err.message);
        res.json({
            status: "failure",
            message: "Error fetching details."
        });
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
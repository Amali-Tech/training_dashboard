require('dotenv').config({ path: '../.env' });
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
let getToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    // check if token is sent
    if(typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    // if no token, respond with error
    else {
        res.status(401).json({
            status: "failure",
            message: "Token missing in header"
        });
    }
}

// ROUTES

// create user route
app.post("/users", getToken, async(req, res, next) => {
    
    // verify token sent
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if(err) {
            // if token is invalid, respond with error
            res.status(403).json({
                status: "failure",
                message: "Invalid token"
            });
        } else {
            // if token is valid, proceed to add user to database
            (async function() {
                try{
                    // get request body details
                    let { email, name, password, active, admin } = req.body;

                    // check if user exists
                    const user = await pool.query("SELECT * from users where email = $1", [email]);

                    if(user.rowCount == 0) {

                        // validate email format and password length
                        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length > 8){

                            // convert active and admin to 1 or 0
                            active === 1 ? true : false;
                            admin === 1 ? true : false;
    
                            // encrypt password
                            password = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));
    
                            // insert record into database
                            const newUser = await pool.query("INSERT INTO users VALUES ($1, $2, $3, $4, $5) RETURNING email, name, isactive, isadmin", 
                            [email, name, password, active, admin]);
    
                            // respond with success message
                            res.status(201).json({
                                status: "success",
                                message: "User created",
                                data: newUser.rows[0]
                            });
                        }
                        else {
                            res.status(400).json({
                                status: "failure",
                                message: "Invalid email or password too short"
                            });
                        }
                    }
                    else {
                        // respond with error if email exists
                        res.status(400).json({
                            status: "failure",
                            message: "Email already exists"
                        });
                    }                    
                } catch (err) {
                    // if error, respond with error message
                    console.error(err.message);
                    return res.status(500).json({
                        status: "failure",
                        message: "Error creating user."
                    });
                }
            })()
        }
    });
});


// get user route
app.get("/users/:email", getToken, async(req, res, next) => {
    
    // verify token sent
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if(err) {
            // if token is invalid, respond with error
            res.status(403).json({
                status: "failure",
                message: "Invalid token"
            });
        } else {
            // if token is valid, proceed to get user from database
            (async function() {
                try{
                    // get email from request parameter
                    const { email } = req.params;

                    // select user details from database
                    const allUser = await pool.query("SELECT email, name, isactive, isadmin FROM users WHERE email = $1", [email]);
                    
                    // respond with user details
                    res.status(200).json({
                        status: "success",
                        message: allUser.rows[0]
                    });
                } catch (err) {
                    // if error, respond with error message
                    console.error(err.message);
                    res.status(500).json({
                        status: "failure",
                        message: "Error retreiving user."
                    });
                }
            })()
        }
    });
});


// get users route
app.get("/users", getToken, async(req, res, next) => {

    // verify token sent
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if(err) {
            // if token is invalid, respond with error
            res.status(403).json({
                status: "failure",
                message: "Error verifying token"
            });
        } else {
            // if token is valid, proceed to get users from database
            (async function() {
                try{
                    // select users details from database
                    const allUsers = await pool.query("SELECT email, name, isactive, isadmin FROM users");

                    // respond with user details
                    res.status(200).json({
                        status: "success",
                        message: allUsers.rows
                    });
                } catch (err) {
                    // if error, respond with error message
                    console.error(err.message);
                    res.status(500).json({
                        status: "failure",
                        message: "Error retreiving users."
                    });
                }
            })()
        }
    });
});

// update user route
app.put("/users/:email", getToken, async(req, res, next) => {

    // verify token sent
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if(err) {
            // if token is invalid, respond with error
            res.status(403).json({
                status: "failure",
                message: "Error verifying token"
            });
        } else {
            // if token is valid, proceed to update user details
            (async function() {
                try{
                    // get details from request parameter
                    let { userName, userActive, userAdmin } = req.body;
                    const { email } = req.params;

                    // convert active and admin to 1 or 0
                    userActive === 1 ? true : false;
                    userAdmin === 1 ? true : false;

                    // update user details in the database
                    const modifyUser = await pool.query("UPDATE users SET name = $1, isactive = $2, isAdmin = $3 WHERE email = $4", [userName, userActive, userAdmin, email]);

                    // respond with success message
                    res.status(200).json({
                        status: "success",
                        message: "User updated"
                    });
                } catch(err) {
                    // if error, respond with error message
                    console.error(err.message);
                    res.status(500).json({
                        status: "failure",
                        message: "Error updating user."
                    });
                }
            })()
        }
    });
});

// reset password route
app.put("/users/reset/:email", getToken, async(req, res, next) => {

    // verify token sent
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if(err) {
            // if token is invalid, respond with error
            res.status(403).json({
                status: "failure",
                message: "Error verifying token"
            });
        } else {
            // if token is valid, proceed to update user password
            (async function() {
                try{
                    // get new password from request body and encrypt it
                    let { newPassword } = req.body;

                    // validate password length
                    if(newPassword.length > 8) {
                        newPassword = bcrypt.hashSync(newPassword, 12);

                        // get user email from request parameter
                        const { email } = req.params;

                        // update user password with the new password
                        const resetPassword = await pool.query("UPDATE users SET password = $1 WHERE email = $2", [newPassword, email]);

                        // respond with success message
                        res.status(200).json({
                            status: "success",
                            message: "Password reset success"
                        });
                    }
                    else {
                        res.status(400).json({
                            status: "failure",
                            message: "Password too short"
                        });
                    }
                } catch(err) {
                    // if error, respond with error message
                    console.error(err.message);
                    res.status(500).json({
                        status: "failure",
                        message: "Error reseting password."
                    });
                }
            })()
        }
    });
});


// delete user route
app.delete("/users/:email", getToken, async(req, res, next) => {

    // verify token sent
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if(err) {
            // if token is invalid, respond with error
            res.status(403).json({
                status: "failure",
                message: "Error verifying token"
            });
        } else {
            // if token is valid, proceed to delete user
            (async function() {
                try{
                    // get user email from request parameter
                    const { email } = req.params;

                    // delete user from database
                    const allUser = await pool.query("DELETE FROM users WHERE email = $1", [email]);

                    // respond with success message
                    res.status(200).json({
                        status: "success",
                        message: "User deleted"
                    });
                } catch (err) {
                    // if error, respond with error message
                    console.error(err.message);
                    res.status(500).json({
                        status: "failure",
                        message: "Error deleting user."
                    });
                }
            })()
        }
    });
});

// upload csv route
app.post("/upload", getToken, async(req, res, next) => {

    // verify token sent
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if(err) {
            // if token is invalid, respond with error
            res.status(403).json({
                status: "failure",
                message: "Error verifying token"
            });
        } else {
            // if token is valid, proceed to load new data
            (async function() {
                try{
                
                    // truncate table
                    const truncateTable = await pool.query("TRUNCATE TABLE trainee");

                    // check if truncate was successfull
                    const recordCount = await pool.query("SELECT * from trainee;");
                    if(recordCount.rowCount === 0){

                        // to check the count of records that will be inserted into the table
                        let itemCount = 0;

                        // load the data
                        for (item of req.body) {

                            // get each field
                            let { email, name, specialization, mentor, entry_month, entry_year, expected_completion_date, regularity_score, responsiveness_score, reliability_score, punctuality_score, course_completion, assessments_completed, assessments_score, projects_submitted, projects_score, capstone_project_score, gca_score } = item
                            
                            // strip percentages from scores and convert to 2dp
                            regularity_score = parseFloat(regularity_score).toFixed(2);
                            responsiveness_score = parseFloat(responsiveness_score).toFixed(2);
                            reliability_score = parseFloat(reliability_score).toFixed(2);
                            punctuality_score = parseFloat(punctuality_score).toFixed(2);
                            course_completion = parseFloat(course_completion).toFixed(2);
                            assessments_score = parseFloat(assessments_score).toFixed(2);
                            projects_score = parseFloat(projects_score).toFixed(2);
                            capstone_project_score = parseFloat(capstone_project_score).toFixed(2);
                            
                            // insert record into table
                            const insertRecord = await pool.query(
                                "INSERT INTO trainee (email, name, specialization, mentor, entry_month, entry_year, expected_comp_date, regularity_score, responsive_score, reliability_score, punctuality_score, course_completion, assessments_completed, assessments_score, projects_submitted, projects_score, capstone_project_score, gca_score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *",
                                [email, name, specialization, mentor, entry_month, entry_year, expected_completion_date, regularity_score, responsiveness_score, reliability_score, punctuality_score, course_completion, assessments_completed, assessments_score, projects_submitted, projects_score, capstone_project_score, gca_score]);
                            
                            // keep count of records inserted
                            itemCount = itemCount + 1;
                        }
                        
                        // respond with success message with number of records inserted
                        res.status(200).json({
                            status: "success",
                            message: itemCount + " records inserted"
                        });
                    } 
                    else {
                        // else if truncate failed, respond with error
                        res.status(500).json({
                            status: "failure",
                            message: "Error updating the database."
                        });
                    }
                } catch(err) {
                    // if error, respond with error message
                    console.error(err.message);
                    res.status(500).json({
                        status: "failure",
                        message: "Error updating the database."
                    });
                }
            })()
        }
    });
});


// get trainee marks route
app.get("/trainee/:email", getToken, async(req, res, next) => {

    // verify token sent
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
        if(err) {
            res.status(403).json({
                status: "failure",
                message: "Error verifying token"
            });
        } else {
            // if token is valid, proceed to load new data
            (async function() {
                try{
                    // get user email from request parameter
                    const { email } = req.params;

                    // get user/trainee marks from the trainee table
                    const traineeDetails = await pool.query("SELECT * FROM trainee WHERE email = $1", [email]);
                    
                    // respond with the marks of the user
                    res.status(200).json({
                        status: "success",
                        message: traineeDetails.rows[0]
                    });
                } catch(err) {
                    // if error, respond with error message
                    console.error(err.message);
                    res.status(500).json({
                        status: "failure",
                        message: "Error fetching details."
                    });
                }
            })()
        }
    });
});

// login/authorization route
app.post("/auth", async(req, res, next) => {

    // get login details from the request body
    const userEmail = req.body.email;
    const userPassword = req.body.password

    // confirm if user email exists in users table
    const getUser = await pool.query("SELECT * FROM users WHERE email = $1", [userEmail]);
    
    if( getUser.rowCount === 1 ) {

        const { email, password, isactive, isadmin } = getUser.rows[0];

        // check if password matches
        bcrypt.compare(userPassword, password).then( doMatch => {

            if(doMatch) {
                // if valid credentials, generate token
                const tkn = {token: jwt.sign({email, isadmin}, process.env.TOKEN_SECRET), email, isadmin}

                // respond with success message and the token
                res.status(200).json({
                    status: "success",
                    message: "Login successful",
                    tkn
                });
            } else {
                // if credentials are not valid, respond with error message
                res.status(400).json({
                    status: "failure",
                    message: "Username / password do not match"
                });
            }
        }).catch( err => {
            // respond with error if system is unable to generate token
            console.log(err);
            res.status(500).json({
                status: "failure",
                message: "Unable to generate Token"
            });
        });
    } else {
        // if user email not found, respond with error
        res.status(400).json({
            status: "failure",
            message: "Username / password do not match"
        });
    }

});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
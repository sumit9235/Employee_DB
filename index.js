const express = require('express');
const {userRouter}=require("./route/user.route.js");
const {connection}=require('./config/db.js')
const {empRouter}=require("./route/employee.route.js")
const {auth}=require('./middleware/auth.middleware.js');
require('dotenv').config();
const cors=require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Home page")
})
app.use("/users",userRouter);
app.use(auth)
app.use("/emp",empRouter);

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Connected to server")
})
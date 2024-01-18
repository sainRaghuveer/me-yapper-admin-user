const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {connectDB} = require("./configs/db");
const { userAuth } = require("./middlewares/userAuth");
const { userRouter } = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
     res.send("Welcome to User-Admin API Home page...")
});

app.use("/", userRouter);

app.use(userAuth);

app.use("/api/admin", userRouter);

// ! Wrong URL-Endpoint
app.use('/', (req, res) => {
     res.status(404).send({message: 'Invalid URL-endpoint!'})
});


app.listen(process.env.PORT ?? 8080, async () => {
     try {
          console.log(`✅ Server started at : http://localhost:${process.env.PORT ?? 8080}`);
          console.log('⏳ Database connecting...')
          await connectDB;
          console.log('✅ Database Connected')
     } catch (error) {
          console.log('❌ error:', error.message);
     }
});
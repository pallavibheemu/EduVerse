const dotenv = require("dotenv");
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");  //Reads cookies sent by the browser.
const cors = require("cors"); //Allows your frontend and backend to communicate.
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload"); //Allows users to upload files. without this, req.files will be undefined


dotenv.config(); //Allows Node.js to read variables from your .env file.
const PORT = process.env.PORT || 4000;

//database connect
database.connect(); //Now your server is connected to MongoDB.
//middlewares
app.use(express.json()); //Converts JSON into JavaScript objects. "email":"abc@gmail.com" becomes req.body.email
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:3000",
    "https://edu-verse-three-tau.vercel.app"
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);
//cloudinary connection
cloudinaryConnect();

//routes mounting
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);


//default route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
}) //this activates the server


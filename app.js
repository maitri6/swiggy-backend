const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
const server = http.createServer(app);
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


const indexRouter = require("./routes/index");
app.use("/api/v1", indexRouter);



mongoose.connect("mongodb+srv://CMS:bk9828064545@cluster0.itloa.mongodb.net/Swiggy?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dbConn = mongoose.connection;
dbConn.on("error", () => {
    console.log("Mongodb connection error");
});

dbConn.once("open", function () {
    console.log("Mongodb connected successfully!!");
});

app.get('/', function (req, res) {
    res.send("Food Delivery App Runs!!")
});

server.listen(1000, function () {
    console.log("Server is running at 1000");
})

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 4000;
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use('/', require('./routes/index.js'));

const URL = "mongodb+srv://bhxshxn:bhxshxn9@cluster0.ixoza.mongodb.net/foodDelivery?retryWrites=true&w=majority"
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database is connected successfully!!!');
});


app.get('/', (req, res) => {
    res.send("Hello from Backend");
});

app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});
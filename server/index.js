const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 4000;


app.use('/', require('./routes/index.js'));


// const url = 
// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,

// })
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log('Database is connected successfully!!!');
// });


app.get('/', (req, res) => {
    res.send("Hello from Backend");
});

app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});
// app.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');

const app = express();
app.use(cors());
app.use(express.json());

const dbURl = 'mongodb+srv://bsse1331:mongodbFAREYA22@cluster0.hodzqty.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Use userRoutes and productRoutes
app.use(userRoutes);
app.use(productRoutes);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

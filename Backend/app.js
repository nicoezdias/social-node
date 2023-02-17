const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed.routes');

const app = express();
mongoose.set('strictQuery', false);
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	res.status(status).json({ message: message });
});

mongoose
	.connect(process.env.DB_URL)
	.then((result) => {
		app.listen(PORT);
	})
	.catch((err) => console.log(err));

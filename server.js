const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3022;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//the number below in project is 27017
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27011/metastasis', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`On Air, station ${PORT}`));
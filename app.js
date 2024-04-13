const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


require('dotenv').config();
const PORT = process.env.PORT;
require('./DB/connection')
const userRoute = require('./routes/userRoute');
const formRoute = require('./routes/formRoute');

const app = express();

//deployment
const path = require('path');
app.use(express.static(path.join(__dirname,'/build')));


app.use(morgan('dev'));
app.use(cors());

app.use('/api', userRoute);
app.use('/api', formRoute);

app.get('/*', function(req, res) { res.sendFile(path.join(__dirname ,'/build/index.html')); }); 




app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
});
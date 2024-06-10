const express     = require('express');
const mongoose    = require('mongoose')
const bodyParser  = require('body-parser');
const { config }  = require('dotenv');
const cors        = require('cors');
const passport    = require("passport");

config({
    path: __dirname + '/.env'
})

// Mongoose DB uri
const uri = `mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PASS}@deer0.ad5xv.mongodb.net/deerchat`;

// connect to the DB with given uri
mongoose.connect(uri).catch(err => console.log(err));

const app = express();
const port = process.env.PORT || 8000;

// use generic middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
require("./app/middlewares/jwt")(passport);

const authenticate = require('./app/middlewares/authenticate');

//MIDDLEWARES
const swaggerUi = require('swagger-ui-express'), swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const authRoute = require('./app/routes/auth');
app.use('/auth', authRoute);

const threadRoute = require('./app/routes/thread');
app.use('/thread', authenticate, threadRoute);

const subforumRoute = require('./app/routes/subforum');
app.use('/subforum', authenticate, subforumRoute);



//Home endpoint
app.get('/', (req, res) => {
    res.status(200).json({message: "This is the Deerchat endpoint", api: "/api-docs"});
});

// Launch server
app.listen(port, () => {  console.log('We are live on port: ' + port);});
const express = require('express')
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env' })
const db = require('./config/config');

require('./models/insumos')
require('./models/cc')
require('./models/proveedor')
require('./models/stock')
require('./models/detalle')

require('./models/usuarios')



const cors = require('cors');
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.sync()
    .then(() => console.log('Conectado'))
    .catch(error => console.log(error))
app.use(cors());

///rutas
app.use('/', routes());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;
app.listen(port, host, () => {
    console.log('el servidor esta funcionando');
})
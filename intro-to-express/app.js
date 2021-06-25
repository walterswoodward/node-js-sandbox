const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(adminRoutes);
app.use(shopRoutes);

// Handle 404
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
})

app.listen(3000);
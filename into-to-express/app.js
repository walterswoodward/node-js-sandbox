const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/', (req, res, next) => {
    console.log("This Middleware always runs");
    next();
});

app.use('/add-product', (req, res) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"></input><button type="submit">Add Product</button></form>');
});

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

// Note that first param is not an exact match but "must begin with"
//  -- so the order of these app.use blocks matters
// -- 
app.use('/', (_req, res) => {
    res.send('<h1>Hello from Express!</h1>');
});


app.listen(3000);
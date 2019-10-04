const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log("Unable to write to file");
        }
    })
    next();
});

/* app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Mantenance Page',
    });
    next();
}); */

//Read From static registry
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: "Welcome Bestin"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Cannot Find Requested Page"
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
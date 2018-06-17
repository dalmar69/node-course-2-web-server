var express = require('express');
var hbs = require('hbs'); //templateing engine
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

/*
    how you register middleware and it takes a function
    @param req  - req obj have access to everythign about the 
                request http method, path, query parameters, 
                info of about the client used(chrome, Ie..etc)
    @param next - exists so you can tell express when your
                middleware function is done. 
                next();  // allows middleware to move on.
*/
app.use((req, res, next) => {
    var now = new Date().toDateString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to appened to server.log.');
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//param@1 the url 
//param@2 What should be done when requested
app.get('/', (request, respones) => {
    // respones.send('<h1>Hello Express!</h1>');
    respones.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to My website',
        name: 'Andrew',
        likes: [
            'biking',
            'Cities'
        ]
    });
});//http get handler

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    }); 
});

app.listen(3000);


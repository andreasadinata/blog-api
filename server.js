//call everything that should be available on top
const express = require('express');
const morgan = require('morgan');
const app = express();
const blogPostsRouter = require('./blog-post-router');

//for morgan and express
app.use(morgan('common'));
//app.use(express.static('public'));
//app.get('/', (req, res) => {
//    res.sendFile(__dirname + '/views/index.html');
//});

//call both router
app.use('/apple', blogPostsRouter);


//listen function
app.listen(3000, () => {
    console.log(`Your app is listening on port ${3000}`);
});

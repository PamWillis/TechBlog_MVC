const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars'); //import handlebar library
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


//create an instance of express
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Register a custom helper for "contentFor"
handlebars.registerHelper('contentFor', function(name, options) {
  if (!this._sections) {
    this._sections = {};
  }
  this._sections[name] = options.fn(this);
  return null;
});

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  extname: 'handlebars', // Set the file extension
  defaultLayout: 'main', // Use 'main.handlebars' as the default layout
  layoutsDir: path.join(__dirname, 'views/layouts'), // Set the layout directory
}));
app.set('view engine', 'handlebars'); // Set the view engine
app.set('port', (process.env.PORT || 3000));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(apiRoutes);

// //route rendering code
// app.get('/', function(req, res){
//   res.render('home', {
//     content: 'This is some content'
//   });
// });


//start the Express app
  app.listen(app.get('port'), function() {
console.log('Server started on port' + app.get('port'));
  });

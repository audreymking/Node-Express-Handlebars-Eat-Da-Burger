const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

// Serves static content for the app from the "public" directory
app.use(express.static('public'));

// Parses application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets Handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Imports routes
const routes = require('./controllers/burgers_controller.js');

app.use(routes);

// Starts server
app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);

const express = require('express');
const api_routes = require('./routes/api-routes');
const html_routes = require('./routes/html-routes');
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlenclosed({ extended: false }));
app.use(express.static('public'));
app.use('/api', api_routes);
app.use('/', html_routes);

app.listen(PORT, () => console.log(`Server running on http://localhost${PORT}`));
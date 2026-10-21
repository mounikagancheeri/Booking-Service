const express = require('express');
const cors = require('cors');

const categoryRoutes =
  require('./routes/category.route');

const providerRoutes =
  require('./routes/provider.route');
  const notFoundHandler =
  require('./middleware/not-found.middleware');

const errorHandler =
  require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/categories', categoryRoutes);

app.use('/api/providers', providerRoutes);
app.use(notFoundHandler);
app.use(errorHandler);


module.exports = app;
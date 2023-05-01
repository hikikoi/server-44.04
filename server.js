import { createServer } from 'http';
import Express from './lib/express.js';

import adminController from './controllers/admin.controller.js';
import categoriesController from './controllers/categories.controller.js';
import subCategoriesController from './controllers/subCategories.controller.js';
import productsController from './controllers/products.controller.js';

const PORT = process.env.PORT || 3000;

const app = new Express();

app
  .get('/admin', adminController.GET)
  .get('/categories', categoriesController.GET)
  .get('/subcategories', subCategoriesController.GET)
  .get('/products', productsController.GET)
  .post('/signin', adminController.POST)
  .post('/categories', categoriesController.POST)
  .post('/subcategories', subCategoriesController.POST)
  .post('/products', productsController.POST)
  .put('/categories', categoriesController.PUT)
  .put('/subcategories', subCategoriesController.PUT)
  .put('/products', productsController.PUT)
  .delete('/categories', categoriesController.DELETE)
  .delete('/subcategories', subCategoriesController.DELETE)
  .delete('/products', productsController.DELETE);

createServer(app.handleRequest.bind(app)).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

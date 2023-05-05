import { createServer } from "http";
import Express from "./lib/express.js";

import adminController from "./controllers/admin.controller.js";
import categoriesController from "./controllers/categories.controller.js";
import subCategoriesController from "./controllers/subCategories.controller.js";
import productsController from "./controllers/products.controller.js";

const PORT = process.env.PORT || 3000;

function httpServer(req, res) {
  const app = new Express(req, res);

  app.get("/admin", adminController.GET);
  app.get("/categories", categoriesController.GET);
  app.get("/subcategories", subCategoriesController.GET);
  app.get("/products", productsController.GET);
  app.post("/signin", adminController.POST);
  app.post("/categories", categoriesController.POST);
  app.post("/subcategories", subCategoriesController.POST);
  app.post("/products", productsController.POST);
  app.put("/categories", categoriesController.PUT);
  app.put("/subcategories", subCategoriesController.PUT);
  app.put("/products", productsController.PUT);
  app.delete("/categories", categoriesController.DELETE);
  app.delete("/subcategories", subCategoriesController.DELETE);
  app.delete("/products", productsController.DELETE);
}

createServer(httpServer).listen(PORT, () =>
  console.log(`server runing ${PORT}`)
);

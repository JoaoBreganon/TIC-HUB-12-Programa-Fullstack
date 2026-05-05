import express from "express";
import { logger } from "./middlewares/logger";
import productsRouter from "./routes/products";
import ordersRouter from "./routes/orders";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON no body das requisições
app.use(express.json());

// Middleware de Logger — registra todas as requisições no terminal
app.use(logger);

// Rotas
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    message: " API REST com Express e TypeScript",
    routes: {
      products: "GET /products | GET /products/:id",
      orders: "POST /orders | PATCH /orders/:id | DELETE /orders/:id",
    },
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

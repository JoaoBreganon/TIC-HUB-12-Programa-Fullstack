import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /products
 * Listagem geral de produtos.
 * Aceita Query String "category" para filtrar resultados.
 * Exemplo: GET /products?category=eletronicos
 */
router.get("/", (req: Request, res: Response): void => {
  const { category } = req.query;

  if (category) {
    res.json({
      message: `Listando produtos da categoria: ${category}`,
      filter: { category },
    });
    return;
  }

  res.json({
    message: "Listando todos os produtos",
  });
});

/**
 * GET /products/:id
 * Consulta específica de um produto pelo ID.
 * Regra: Se o ID for um número negativo, retorna status 400 (Bad Request).
 */
router.get("/:id", (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({
      error: "Bad Request",
      message: "O ID deve ser um número válido.",
    });
    return;
  }

  if (id < 0) {
    res.status(400).json({
      error: "Bad Request",
      message: "O ID não pode ser um número negativo.",
    });
    return;
  }

  res.json({
    message: `Exibindo detalhes do produto ${id}`,
    product: { id },
  });
});

export default router;

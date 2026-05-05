import { Router, Request, Response } from "express";
import { validateBody } from "../middlewares/validateBody";

const router = Router();

/**
 * POST /orders
 * Criação de um novo pedido.
 * O body deve conter: nome do cliente e lista de IDs dos produtos.
 * Middleware validateBody garante que o body não está vazio.
 * Retorna status 201 (Created) com o objeto recebido.
 */
router.post("/", validateBody, (req: Request, res: Response): void => {
  const { clientName, productIds } = req.body;

  res.status(201).json({
    message: "Pedido criado com sucesso!",
    order: {
      clientName,
      productIds,
    },
  });
});

/**
 * PATCH /orders/:id
 * Atualização de status de um pedido.
 * Utiliza Params para o ID do pedido e Body para o novo status.
 * Exemplo de body: { "status": "pago" }
 */
router.patch("/:id", (req: Request, res: Response): void => {
  const { id } = req.params;
  const { status } = req.body;

  res.json({
    message: `Status do pedido ${id} atualizado.`,
    order: {
      id: Number(id),
      status,
    },
  });
});

/**
 * DELETE /orders/:id
 * Cancelamento de um pedido.
 * Retorna status 204 (No Content) para confirmar a exclusão.
 */
router.delete("/:id", (req: Request, res: Response): void => {
  res.status(204).send();
});

export default router;

import { Request, Response, NextFunction } from "express";

/**
 * Middleware de Validação de Body
 * Retorna 400 se o corpo da requisição estiver vazio
 */
export const validateBody = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({
      error: "Bad Request",
      message: "O corpo da requisição não pode estar vazio.",
    });
    return;
  }
  next();
};

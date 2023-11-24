import { Handler } from "express";

export const methodNotAllowed: Handler = (_,res) => res.sendStatus(403);

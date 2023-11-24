import { Handler } from "express";

import { JWT } from "../@helper/jwt";

export const verifyToken: Handler = (req, res, next) => {
    const jwt = new JWT();
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.status(401).send("no token");

    const idOrNull = jwt.authenticateToken(token);
    if(!idOrNull) return res.status(401).send("no id");
    req.body.id = idOrNull;
    next();
}
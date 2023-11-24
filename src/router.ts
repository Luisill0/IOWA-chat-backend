import express from "express";

import { auth, editProfile, getUserDoc, login, signUp } from "./routes/users";
import { methodNotAllowed } from "./routes/not-allowed";
import { verifyToken } from "./routes/verify-token";

export const router = express.Router()

router.route("/").all((_,res) => {res.sendStatus(200)});

router.route("/auth")
    .post(
        verifyToken,
        auth
    )
    .all(methodNotAllowed);

router.route("/edit-profile")
    .post(
        verifyToken,
        editProfile
    )
    .all(methodNotAllowed);

router.route("/get-user-doc")
    .post(getUserDoc)
    .all(methodNotAllowed);

router.route("/login")
    .post(login)
    .all(methodNotAllowed);

router.route("/signup")
    .post(signUp)
    .all(methodNotAllowed);

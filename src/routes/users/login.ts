import { Handler } from "express";

import { ErrorCodes } from "../../@helper/errorCodes";
import { Maybe } from "../../@interface/Mapped";
import { User } from "../../@models/User";

import { JWT } from "../../@helper/jwt";
import { UserCredentials } from "../../@interface/User";
import { pick } from "../../@helper/pick";
import { KeysStrippedList } from "../../@helper/strippedKeys";

export const login: Handler = async (req,res) => {
    const { username, password } = req.body as Maybe<UserCredentials>;

    if (!username || !password) return res.status(400).send("missing args");

    const user = await User.findOne({ where: { username: username, password: password }});
    if (!user) return res.status(500).send({code: ErrorCodes.USER_NOT_FOUND, message: "user not found"});

    const strippedUser = pick(user, ...KeysStrippedList);

    const jwt = new JWT();
    const token = jwt.generateAccessToken(strippedUser.id.toString());

    return res.status(200).send({user: strippedUser, token: token});
}

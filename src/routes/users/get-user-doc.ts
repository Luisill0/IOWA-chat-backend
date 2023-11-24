import { Handler } from "express";

import { ErrorCodes } from "../../@helper/errorCodes";
import { User } from "../../@models/User";
import { pick } from "../../@helper/pick";

export const getUserDoc: Handler = async (req,res) => {
    const username = req.body.username as string | undefined;
    if (!username) return res.status(200).send("missin username");

    const maybeUser = await User.findOne({ where: {username: username}});
    if (!maybeUser) return res.status(500).send({code: ErrorCodes.USER_NOT_FOUND, message: "user not found"});

    const userStripped = pick(maybeUser, "username", "name", "description", "photo", "link");
    return res.status(200).send(userStripped);
}

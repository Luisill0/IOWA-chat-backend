import { Handler } from "express";

import { ErrorCodes } from "../../@helper/errorCodes";
import { Maybe } from "../../@interface/Mapped";

import { JWT } from "../../@helper/jwt";
import { User } from "../../@models/User";
import { UserDoc } from "../../@interface/User";
import { pick } from "../../@helper/pick";
import { KeysStrippedList } from "../../@helper/strippedKeys";

export const signUp: Handler = async (req,res) => {
    const userData = req.body as Maybe<UserDoc> | undefined;
    if (!userData)
        return res.status(400).send({code: ErrorCodes.MISSING_ARGS, message: "missing body"});

    if (!userData.username || !userData.password || !userData.name)
        return res.status(400).send({code: ErrorCodes.MISSING_ARGS, message: "missing arguments"});

    const userPrevious = await User.findOne({ where: { username: userData.username }});
    if (userPrevious)
        return res.status(500).send({code: ErrorCodes.USERNAME_TAKEN, message: "username taken"});

    const user = await User.create({
        username: userData.username,
        password: userData.password,
        name: userData.name,
        description: null,
        link: null,
        photo: null
    });

    const strippedUser = pick(user, ...KeysStrippedList);

    const jwt = new JWT();
    const token = jwt.generateAccessToken(strippedUser.id.toString());

    return res.status(200).send({user: strippedUser, token: token});
}
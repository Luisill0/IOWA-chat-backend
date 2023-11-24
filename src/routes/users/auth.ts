import { Handler } from "express";
import { pick } from "../../@helper/pick";
import { KeysStrippedList } from "../../@helper/strippedKeys";
import { User } from "../../@models/User";

export const auth: Handler = async (req,res) => {
    const id = req.body.id as string | undefined;
    if (!id) return res.status(500).send("no user");

    const userDB = await User.findOne({where: {id: id}});
    if (!userDB) return res.status(500).send("not found");

    const userStripped = pick(userDB, ...KeysStrippedList);

    return res.status(200).send(userStripped);
}
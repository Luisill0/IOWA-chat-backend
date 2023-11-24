import { Handler } from "express";
import { UserDoc } from "../../@interface/User";
import { User } from "../../@models/User";
import { KeysStrippedList } from "../../@helper/strippedKeys";
import { pick } from "../../@helper/pick";

type EditableUser = Pick<UserDoc, "name" | "photo" | "link" | "description">

export const editProfile: Handler = async (req,res) => {
    const id = req.body.id as string | undefined;
    const newData = req.body.userData as UserDoc | undefined;
    if (!newData) return res.status(400).send("missing user data");
    if (!id || id !== newData.id.toString()) return res.status(403).send("auth error");

    const keysToEdit = req.body.keys as Array<keyof EditableUser> | undefined;
    if (!keysToEdit) return res.status(400).send("missing keys");

    const userDB = await User.findOne({where: { id: id }});
    if (!userDB) return res.status(500).send("user not found");

    keysToEdit.forEach(key => {
        userDB[key] = newData[key] as string;
    })

    await userDB.save();

    const strippedUser = pick(userDB, ...KeysStrippedList);
    return res.status(200).send(strippedUser);
}
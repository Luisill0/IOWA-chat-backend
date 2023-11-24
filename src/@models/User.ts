import { Model } from "sequelize";
import { UserDoc, UserInput } from "../@interface/User";

export class User extends Model<UserDoc, UserInput> implements UserDoc {
    public id!: number;
    public username!: string;
    public password!: string;
    public name!: string;
    public description!: string | null;
    public link!: string | null;
    public photo!: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;    
}

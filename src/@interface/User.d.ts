import { CreationOptional, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";

export type UserDoc = {
    id: number;
    username: string;
    password: string;
    name: string;
    description: string | null;
    link: string | null;
    photo: string | null;
    
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface UserInput extends Optional<UserDoc, "id"> {}
export interface UserOutput extends Required<UserDoc> {}

export type UserCredentials = {
    username: string;
    password: string;
}

export type StrippedUser = Omit<UserDoc, "password">;

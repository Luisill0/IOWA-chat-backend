import { Sequelize, DataTypes } from "sequelize";
import { User } from "./@models/User";
import fs from "fs";

const log = (sql: string) => {
    const logfile = fs.createWriteStream(__dirname + "/database.log", {flags: "a+"});
    logfile.write(`[${new Date()}]: ${sql} \n`);
}

const useLog = process.env.LOGFILE === "true";

export const sequelize = new Sequelize('database', 'root', 'root', {
    dialect: 'sqlite',
    host: 'localhost',
    storage: 'orm-db.sqlite',
    logging: useLog ? log : false
});

User.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    username: {
        type: new DataTypes.STRING(64),
        unique: true,
        allowNull: false
    },
    password: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    name: {
        type: new DataTypes.STRING(64),
        allowNull: false
    },
    description: {
        type: new DataTypes.STRING(255),
        allowNull: true
    },
    link: {
        type: new DataTypes.STRING(128),
        allowNull: true
    },
    photo: {
        type: new DataTypes.STRING(128),
        allowNull: true
    }}, 
    {
        timestamps: true,
        sequelize: sequelize,
        paranoid: true
    }
);

sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
    console.log('// Tables in database','==========================');
    console.log(tableObj);
})
.catch((err) => {
    console.log('showAllSchemas ERROR',err);
})

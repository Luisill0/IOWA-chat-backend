import dotenv from 'dotenv';
dotenv.config();

import { appServer } from "./app";
import { sequelize } from './db';

import { version } from "../package.json";

const PORT = process.env.PORT; if(!PORT) throw new Error('port is not defined');

appServer.listen(PORT, async  () => {
    console.log(`Chat back-end ${version}`)
    await sequelize.sync().then(() => console.log("Database synced!"))

    console.log(`listening on ${PORT}`);
})
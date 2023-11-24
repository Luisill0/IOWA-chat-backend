import cors from 'cors';
import express from "express";
import http from 'http';
import { Server } from 'socket.io';

import { onChatMessage } from './socket-events';
import { router } from './router';
import { onJoinRoom } from './socket-events/join-room';

export const app = express();

export const appServer = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(router);

export const io = new Server(
    appServer,
    { cors: { origin: '*' }}
);

io.on("connection", (socket) => {
    socket.on("chat-message", (msg) => onChatMessage(msg, socket));
    socket.on("join-room", (room) => onJoinRoom(room, socket));
});

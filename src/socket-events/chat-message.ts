import { Socket } from "socket.io";

import { ChatMessage } from "../@interface/ChatMessage";
import { Maybe } from "../@interface/Mapped";
import { io } from "../app";

export const onChatMessage = (chatMessage: ChatMessage, socket: Socket) => {
    const { user, message, time, room } = chatMessage as Maybe<ChatMessage>;
    if (!user || !message || !time) return;

    if (room) return io.to(room).emit("chat-message", { ...chatMessage, sent: false });
    else return socket.broadcast.emit("chat-message", { ...chatMessage, sent: false });
}
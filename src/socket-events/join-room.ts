import { Socket } from "socket.io";

export const onJoinRoom = (room: string | undefined, socket: Socket) => {
    if (!room) return;
    socket.join(room);

    return socket.emit("room-joined", room);
}
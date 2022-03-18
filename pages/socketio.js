import { io } from 'socket.io-client';
let socket;

export const initiateSocketConnection = () => {
    socket = io('http://127.0.0.1:12345');
};

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
};
export const getUpdate = ()=>{
    socket.on('conn', res=>console.log(res));
};
export const getUpdate2 = ()=>{
    socket.on('conn2', res=>console.log(res));
};
export const sendData = ()=>{
    socket.emit('res', 'from client');
};
export const getPasswordStatus = ()=>{
    socket.on('incorrect-data', res=>console.log(res));
};
export const passwordChangeError = ()=>{
    return socket.on('password-change-error', res=>{
        console.log(res);

        return res;
    });
};

export const socketio = () => {
    if (!socket) {
        throw new Error("can't initialize socket");
    }
    console.log(socket);

    return socket;
};

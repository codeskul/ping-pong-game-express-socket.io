let readyPlayerCount = 0;

function listen(io) {
  const pongNamespace = io.of("/pong");
  pongNamespace.on("connection", (socket) => {
    let room;
    console.log("Player connected", socket.id);

    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayerCount / 2);
      socket.join(room);

      console.log("Player ready", socket.id, room);
      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        pongNamespace.in(room).emit("startGame", socket.id); //sending 2nd player as referee to all connected clients
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData); //sending paddleData to all clients expect sender
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Clent ${socket.id} disconnected: ${reason}`);
      socket.leave(room);
    });
  });
}

module.exports = {
  listen,
};

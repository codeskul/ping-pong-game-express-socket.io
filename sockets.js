let readyPlayerCount = 0;

function listen(io) {
  io.on("connection", (socket) => {
    console.log("Player connected", socket.id);

    socket.on("ready", () => {
      console.log("Player ready", socket.id);
      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        io.emit("startGame", socket.id); //sending 2nd player as referee to all connected clients
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData); //sending paddleData to all clients expect sender
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Clent ${socket.id} disconnected: ${reason}`);
    });
  });
}

module.exports = {
  listen,
};

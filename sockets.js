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
  });
}

module.exports = {
  listen,
};

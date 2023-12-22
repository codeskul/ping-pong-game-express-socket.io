function listen(io) {
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
  });
}

module.exports = {
  listen,
};

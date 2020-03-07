const server = require('./server');

const PORT = process.env.PORT || 4000;

server.get('/', (req, res) => {
  res.json({
      message: "We're all mad here..."
  })
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});  
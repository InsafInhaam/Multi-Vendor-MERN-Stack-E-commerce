const app = require("./app");

// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exceptions`);
});


// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}


const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for${err.message}`);
  console.log(`Shutting down the server for unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});


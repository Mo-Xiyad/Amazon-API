import express from "express";
import listEndpoints from "express-list-endpoints";
import productRoute from "./services/products/index.js";
// import reviewRoute from "";
// import usersRoute from "";
import { testConnetion, connetDB } from "./db/index.js";

const server = express();

const { PORT } = process.env;

server.use(express.json());

server.use("/products", productRoute);
// server.use("/reviews", reviewRoute);

console.table(listEndpoints(server));

server.listen(PORT, async () => {
  console.log(`✅ Server is running on port ${PORT}`);
  await testConnetion();
  await connetDB();
});

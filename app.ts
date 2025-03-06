import express from 'express';
import dotenv from 'dotenv';
import * as productGenerator from "./src/service/generator";

dotenv.config();

const app = express();
app.use(express.json());

app.listen(8080, () => {
  console.log('Server running on port 8080');
});

productGenerator.generate();

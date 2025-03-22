import express from 'express';
import * as productGenerator from "./src/service/generator";
import {router as inventory} from './src/api/routes'
import config from "./config";

const app = express();
app.use(express.json());
app.use('/inventory', inventory);

app.listen(config.app.port, () => {
  console.log(`Server running on port ${config.app.port}`);
});

productGenerator.generate();

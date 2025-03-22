import {Router, Request, Response} from 'express';
import * as applicationService from '../service/application-service';
import {Product} from "../types";

export const router: Router = Router();
router.get('/products', (req: Request, res: Response): void => {
  applicationService.retrieveAllProducts().then((products: Product[]) => {
    res.end(JSON.stringify(products));
  });
});

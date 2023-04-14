import { Express } from 'express';

// Routers
import AuthenticateRoutes from "@/routes/authenticate/auth.route";
import CategoryRoutes from "@/routes/categoryAndGroup/category.route";
import BrandRoutes from '../routes/brand/brand.route';
import ProductRoutes from './product/pproduct.route';

// Middlewares
import authenticateToken from '@/middlewares/authenticateToken';


const useRoutes = (app: Express) => {
  // app.use(authenticateToken)

  app.use("/auth", AuthenticateRoutes)
  app.use("/category", CategoryRoutes)
  app.use("/brand", BrandRoutes)
  app.use("/product", ProductRoutes)
}

export default useRoutes
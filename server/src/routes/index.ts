import { Express } from 'express';

// Routers
import AuthenticateRoutes from "@/routes/authenticate/auth.route";
import CategoryRoutes from "@/routes/categoryAndGroup/category.route";
import CartRoutes from "@/routes/cart/cart.route";
import BrandRoutes from '@/routes/brand/brand.route';
import ProductRoutes from '@/routes/product/product.route';
import UserRoutes from '@/routes/user/user.route';

// Middlewares
import authenticateToken from '@/middlewares/authenticateToken';


const useRoutes = (app: Express) => {
  // app.use(authenticateToken)

  app.use("/auth", AuthenticateRoutes)
  app.use("/category", CategoryRoutes)
  app.use("/brand", BrandRoutes)
  app.use("/product", ProductRoutes)
  app.use("/cart", CartRoutes)
  app.use("/user", UserRoutes)
}

export default useRoutes
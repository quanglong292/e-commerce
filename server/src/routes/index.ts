import { Express } from 'express';

// Routers
import AuthenticateRoutes from "@/routes/authenticate/auth.route";
import CategoryRoutes from "@/routes/categoryAndGroup/category.route";

// Middlewares
import authenticateToken from '@/middlewares/authenticateToken';

const useRoutes = (app: Express) => {
  // app.use(authenticateToken)

  app.use("/auth", AuthenticateRoutes)
  app.use("/category", CategoryRoutes)
}

export default useRoutes
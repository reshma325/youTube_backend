import { Router } from "express";
import authRoutes from './AuthRoutes.js'

 const router=Router();
router.use("/auth",authRoutes);
export default router
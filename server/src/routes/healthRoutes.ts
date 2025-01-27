import {HealthCheckController} from "../health/HealthCheckController";
import {Router} from "express";

export const provideHealthRoutes = (healthCheckController: HealthCheckController): Router => {
    const healthCheckRouter = Router();
    healthCheckRouter.get("/", healthCheckController.doHealthCheck.bind(healthCheckController));
    return healthCheckRouter;
}

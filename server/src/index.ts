import express from "express";
import {PasswordHasher} from "./auth/PasswordHasher";
import {UserDal} from "./user/UserDal";
import {SignUpService} from "./auth/SignUpService";
import {AuthController} from "./auth/AuthController";
import {provideAuthRouter} from "./routes/authRoutes";
import {provideHealthRoutes} from "./routes/healthRoutes";
import {HealthCheckController} from "./health/HealthCheckController";

const app = express();

app.use(express.json());

const PORT = 3000;

const passwordHasher = new PasswordHasher();
const userDal = new UserDal();
const signUpService = new SignUpService(userDal, passwordHasher);
const authController = new AuthController(signUpService);
const healthCheckController = new HealthCheckController();

const healthCheckRouter = provideHealthRoutes(healthCheckController);
const authRouter = provideAuthRouter(authController);

app.use("/api/auth", authRouter);
app.use("/api/health-check", healthCheckRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

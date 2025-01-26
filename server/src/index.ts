import express, {Request, Response} from "express";
import {PasswordHasher} from "./auth/PasswordHasher";
import {UserDal} from "./user/UserDal";
import {SignUpService} from "./auth/SignUpService";

const app = express();

app.use(express.json());

const PORT = 3000;

const passwordHasher = new PasswordHasher();
const userDal = new UserDal();
const signUpService = new SignUpService(userDal, passwordHasher);

app.get("/health", (_req, res) => {
    res.status(200).send("0");
});

app.post("/user", async (req: Request, res: Response) => {
    const {email, password} = req.body;
    if ((typeof password !== "string") || (typeof email !== "string")) {
        res.status(400).send("Invalid email or password");
        return
    }

    try {
        const createdUser = await signUpService.signUp(email, password);
        console.log(`Created user with id ${createdUser.id} and email ${createdUser.email}`);
        res.status(201).send(`Created user with id ${createdUser.id}`);
    } catch (err) {
        console.log(`Error creating user: ${(err as Error).message}`);
        res.status(500).send("Error creating user");
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

import {Request, Response} from "express";
import {SignUpService} from "./SignUpService";
import {UserAlreadyExistsError} from "./UserAlreadyExistsError";

export class AuthController {
    private signUpService: SignUpService;

    constructor(signUpService: SignUpService) {
        this.signUpService = signUpService;
    }

    public async signUp(req: Request, res: Response) {
        const {email, password} = req.body;
        if ((typeof password !== "string") || (typeof email !== "string")) {
            res.status(400).send("Invalid email or password");
            return
        }

        try {
            const createdUser = await this.signUpService.signUp(email, password);
            console.log(`Created user with id ${createdUser.id} and email ${createdUser.email}`);
            res.status(201).send(`Created user with id ${createdUser.id}`);
        } catch (err) {
            console.log(`Error creating user: ${(err as Error).message}`);
            if (err instanceof UserAlreadyExistsError) {
                res.status(409).send("User already exists");
            } else {
                res.status(500).send("Error creating user");
            }
        }
    }
}

import {Request, Response} from "express";
import {SignUpService} from "./SignUpService";
import {UserAlreadyExistsError} from "./UserAlreadyExistsError";
import {AuthenticationService} from "./AuthenticationService";
import {UserDoesNotExistError} from "./UserDoesNotExistError";
import {InvalidPasswordError} from "./InvalidPasswordError";

export class AuthController {
    private signUpService: SignUpService;
    private authenticationService: AuthenticationService;

    constructor(signUpService: SignUpService, authenticationService: AuthenticationService) {
        this.signUpService = signUpService;
        this.authenticationService = authenticationService;
    }

    public async logIn(req: Request, res: Response) {
        const {email, password} = req.body;
        if ((typeof password !== "string") || (typeof email !== "string")) {
            res.status(400).send("Invalid email or password");
            return
        }

        try {
            const authenticatedUser = await this.authenticationService.authenticate(email, password);
            res.status(200).json({email: authenticatedUser.email, id: authenticatedUser.id});
        } catch (err) {
            if (err instanceof UserDoesNotExistError || err instanceof InvalidPasswordError) {
                res.status(401).send("Invalid credentials");
            } else {
                console.log(err);
                res.status(500).send("Error authenticating");
            }
        }
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

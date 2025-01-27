import {Request, Response} from "express";

export class HealthCheckController {
    public doHealthCheck(req: Request, res: Response) {
        res.status(200).send("0");
    }
}

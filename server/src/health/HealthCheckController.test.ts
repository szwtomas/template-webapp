import {HealthCheckController} from "./HealthCheckController";
import {Request, Response} from "express";

describe("HealthCheckController", () => {
    describe("doHealthCheck", () => {
        let response: Partial<Response>;

        beforeEach(() => {
            response = {status: jest.fn().mockReturnThis(), send: jest.fn()};
        });

        it("should return ok status code and a 0 as the response", () => {
            const healthCheckController = new HealthCheckController();
            healthCheckController.doHealthCheck({} as Request, response as Response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.send).toHaveBeenCalledWith("0");
        });
    });
});
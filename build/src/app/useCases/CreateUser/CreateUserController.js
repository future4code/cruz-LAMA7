"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
class CreateUserController {
    constructor(CreateUserUseCase) {
        this.CreateUserUseCase = CreateUserUseCase;
    }
    async handle(req, res) {
        try {
            const input = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role,
            };
            const response = await this.CreateUserUseCase.execute(input);
            res.status(200).send(response);
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    }
}
exports.CreateUserController = CreateUserController;

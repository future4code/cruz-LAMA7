"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const User_1 = require("../../entities/User");
class CreateUserUseCase {
    constructor(usersRepository, validator, idGenerator, hashManager, authenticator) {
        this.usersRepository = usersRepository;
        this.validator = validator;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
    }
    async execute(data) {
        const message = 'Sucess!';
        const validData = this.validator.validate(data);
        const id = this.idGenerator.generate();
        const passwordHash = await this.hashManager.hash(validData.password);
        const user = new User_1.User({ ...validData, password: passwordHash }, id);
        this.usersRepository.save(user);
        const token = this.authenticator.generateToken({
            id: user.id,
            role: user.role,
        });
        return { message, token };
    }
}
exports.CreateUserUseCase = CreateUserUseCase;

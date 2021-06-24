"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserValidator = void 0;
class CreateUserValidator {
    validate(data) {
        if (!data.email || !data.name || !data.password || !data.role) {
            throw new Error('Invalid Data');
        }
        return data;
    }
}
exports.CreateUserValidator = CreateUserValidator;

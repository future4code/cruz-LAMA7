"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.User = void 0;
class User {
    constructor(props, id) {
        Object.assign(this, props);
        this.id = id;
    }
    static stringToUserRole(input) {
        switch (input) {
            case 'NORMAL':
                return UserRole.NORMAL;
            case 'ADMIN':
                return UserRole.ADMIN;
            default:
                throw new Error('Invalid user role');
        }
    }
    static toUserModel(user) {
        const { id, ...props } = user;
        return new User(props, id);
    }
}
exports.User = User;
var UserRole;
(function (UserRole) {
    UserRole["NORMAL"] = "NORMAL";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));

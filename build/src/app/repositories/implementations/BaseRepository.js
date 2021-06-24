"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const knex_1 = __importDefault(require("knex"));
dotenv_1.default.config();
class BaseRepository {
    getConnection() {
        if (!BaseRepository.connection) {
            BaseRepository.connection = knex_1.default({
                client: 'mysql',
                connection: {
                    host: String(process.env.DB_HOST),
                    user: String(process.env.DB_USER),
                    password: String(process.env.DB_PASSWORD),
                    database: String(process.env.DB_SCHEMA),
                    port: 3306,
                    multipleStatements: true,
                },
            });
        }
        return BaseRepository.connection;
    }
    static async destroyConnection() {
        if (BaseRepository.connection) {
            await BaseRepository.connection.destroy();
            BaseRepository.connection = null;
        }
    }
}
exports.BaseRepository = BaseRepository;
BaseRepository.connection = null;

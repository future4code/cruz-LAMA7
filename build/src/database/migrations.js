"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const BaseRepository_1 = require("../app/repositories/implementations/BaseRepository");
dotenv_1.default.config();
class DatabaseMigrator extends BaseRepository_1.BaseRepository {
    async connect(sql) {
        const connection = this.getConnection();
        await connection.raw(sql);
    }
    async destroy() {
        BaseRepository_1.BaseRepository.destroyConnection();
    }
}
const migrator = new DatabaseMigrator();
migrator
    .connect(`
    CREATE TABLE IF NOT EXISTS lama_bandas(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      music_genre VARCHAR(255) NOT NULL,
      responsible VARCHAR(255) UNIQUE NOT NULL 
    );

    CREATE TABLE IF NOT EXISTS lama_usuarios(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
    );

    CREATE TABLE IF NOT EXISTS lama_shows(
      id VARCHAR(255) PRIMARY KEY,
      week_day VARCHAR(255) NOT NULL,
      start_time INT NOT NULL,
      end_time INT NOT NULL,
      band_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(band_id) REFERENCES lama_bandas(id)
    );
   `)
    .then(() => {
    console.log('Successful Migration!');
    migrator.destroy();
})
    .catch((error) => {
    console.log('A error ocurred:', error.sqlMessage || error.message);
    migrator.destroy();
});

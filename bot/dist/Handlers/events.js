"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventNames_1 = require("../Validation/EventNames");
const util_1 = require("util");
const glob_1 = require("glob");
const ascii_table_1 = __importDefault(require("ascii-table"));
const pg = (0, util_1.promisify)(glob_1.glob);
module.exports = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const Table = new ascii_table_1.default("Events loaded");
    console.log(`${process.cwd()}/src/Events/*/*.js`);
    (yield pg(`${process.cwd()}/src/Events/*/*.js`)).map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const event = require(file);
        console.log(`{event.name} - loaded `);
        if (!EventNames_1.Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            yield Table.addRow(`${event.name || "MISSING"}`, `🛑 EventName is invalid or missing: ${L[6] + `/` + L[7]}`);
            return;
        }
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        }
        else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
        yield Table.addRow(event.name, "😎 SUCCESSFULL");
    }));
    console.log(Table.toString());
});

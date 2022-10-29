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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const User_1 = __importDefault(require("./routes/User"));
const app = (0, express_1.default)();
const port = config_1.config.server.port;
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('Connected to MongoDB');
})
    .catch((error) => {
    Logging_1.default.error(error);
});
/** Only start server if Mongo connects */
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const startServer = () => {
    app.use((req, res, next) => {
        /** Log the request */
        Logging_1.default.info(`Incoming Method --> [${req.method}] - Url [${req.url}] - IP [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging_1.default.info(`Incoming Method --> [${req.method}] - Url [${req.url}] - IP [${req.socket.remoteAddress}] - Status [${res.statusCode}]`);
        });
        next();
    });
};
startServer();
/** Routes */
app.use('/user', User_1.default);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: 'Hello Again Typescript World' });
}));
/** Health Check */
app.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
try {
    app.listen(port, () => {
        Logging_1.default.info(`Server running on port ${port}`);
    });
}
catch (error) {
    Logging_1.default.error(error);
}
/** Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    Logging_1.default.error(error);
    return res.status(404).json({ message: error.message });
});
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Array to store error data in memory
const errors = [];
// Serve static files from the "public" directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Serve the dashboard HTML file
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../index.html'));
    res.send("hey");
});
// Endpoint to receive errors and store them
app.post('/errors', (req, res) => {
    const errorData = req.body;
    console.log('Received error data:', errorData);
    errors.push(errorData); // Store the error data in the array
    res.status(200).send('Error details received');
});
// Endpoint to retrieve stored errors
app.get('/api/errors', (req, res) => {
    res.json(errors);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

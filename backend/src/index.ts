import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Array to store error data in memory
const errors: ErrorPayload[] = [];

interface DeviceInfo {
  userAgent: string;
  platform: string;
  language: string;
}

interface ErrorPayload {
  error: string;
  errorInfo: string;
  deviceInfo: DeviceInfo;
}

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve the dashboard HTML file
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../index.html'));
  res.send("hey");
});

// Endpoint to receive errors and store them
app.post('/errors', (req: Request, res: Response) => {
  const errorData: ErrorPayload = req.body;
  console.log('Received error data:', errorData);
  
  errors.push(errorData);  // Store the error data in the array

  res.status(200).send('Error details received');
});

// Endpoint to retrieve stored errors
app.get('/api/errors', (req: Request, res: Response) => {
  res.json(errors);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
import express, { type Express } from "express";

// security
import globalRateLimit from "@middleware/rateLimit.middleware.js";
import corsMiddleware from '@middleware/cors.middleware.js';

// routes
// import indexRouter from '@routes/index.routes.js';

// app server
const app: Express = express();

// parsers
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

// security middlewares
corsMiddleware(app);
globalRateLimit(app);

// routes group
// app.use('/api/v1', indexRouter);

export default app;
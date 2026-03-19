import type { Express } from 'express';

import rateLimit from "express-rate-limit";

const globalRateLimit = (app: Express) => {
    app.use(rateLimit({

    }))
}

export default globalRateLimit;
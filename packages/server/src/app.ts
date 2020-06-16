import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import BaseControllerInterface from './interfaces/base-controller.interface';
import errorMiddleware from './middlewares/error.middleware';

export default class App {
    public app: express.Application;

    constructor(controllers: BaseControllerInterface[]) {
        this.app = express();

        this.connectToDB();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    public listen(): void {
        const {PORT} = process.env;
        this.app.listen(PORT, () => {
            console.log(`App listening on the port ${PORT}`);
        });
    }

    private initializeMiddleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(morgan('combined'));
    }

    private initializeErrorHandling(): void {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: BaseControllerInterface[]): void {
        controllers.forEach((controller: BaseControllerInterface) => {
            this.app.use('/api', controller.router);
        });
    }

    private connectToDB(): void {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH
        } = process.env;

        const mongoParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, mongoParams)
            .then(() => console.log('DB connected'))
            .catch((error) => console.log('DB not connected', error));
    }
}

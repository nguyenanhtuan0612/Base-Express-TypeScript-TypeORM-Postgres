import { NextFunction, Request, Response } from 'express';

class TypeQuestionController {
    // public index = (req: Request, res: Response, next: NextFunction): void => {
    //     try {
    //         res.send('This is the truth of the universe');
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    async create(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error);
        }
    }
}

export default TypeQuestionController;

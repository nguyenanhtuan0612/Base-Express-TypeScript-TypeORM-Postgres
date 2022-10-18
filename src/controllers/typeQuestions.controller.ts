import { Options, RequestWithOptions } from '@/interfaces/request.interface';
import TypeQuestionService from '@/services/typeQuestions.service';
import { NextFunction, Request, Response } from 'express';

class TypeQuestionController {
    public service = new TypeQuestionService();

    // public index = (req: Request, res: Response, next: NextFunction): void => {
    //     try {
    //         res.send('This is the truth of the universe');
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.service.createNewType(req.body);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    };

    public list = async (
        req: RequestWithOptions,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const options: Options = req.options;
            const data = await this.service.list(options);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    };
}

export default TypeQuestionController;

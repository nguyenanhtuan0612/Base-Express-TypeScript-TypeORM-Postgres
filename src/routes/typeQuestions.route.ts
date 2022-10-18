import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import TypeQuestionController from '@/controllers/typeQuestions.controller';
import { CreateTypeQuestionDto } from '@/dtos/typeQuestions.dto';
import queryMiddleware from '@/middlewares/query.middleware';

class TypeQuestionRoute implements Routes {
    public path = '/typeQuestions';
    public router = Router();
    public controller = new TypeQuestionController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}`,
            validationMiddleware(CreateTypeQuestionDto, 'body'),
            this.controller.create,
        );
        this.router.get(`${this.path}`, queryMiddleware, this.controller.list);
        // this.router.get(
        //     `${this.path}/:id(\\d+)`,
        //     this.usersController.getUserById,
        // );
        // this.router.put(
        //     `${this.path}/:id(\\d+)`,
        //     validationMiddleware(CreateUserDto, 'body', true),
        //     this.usersController.updateUser,
        // );
        // this.router.delete(
        //     `${this.path}/:id(\\d+)`,
        //     this.usersController.deleteUser,
        // );
    }
}

export default TypeQuestionRoute;

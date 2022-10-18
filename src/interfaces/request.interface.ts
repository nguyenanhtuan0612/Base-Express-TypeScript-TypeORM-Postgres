import { Request } from 'express';

export interface Options {
    where?: any;
    take: number;
    skip: number;
    order?: any;
}

export interface RequestWithOptions extends Request {
    options: Options;
}

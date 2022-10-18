import { NextFunction, Response } from 'express';
import { Options, RequestWithOptions } from '@/interfaces/request.interface';
import { Filter, Order } from '@/dtos/query.dto';
import { validation } from '@/utils/util';
import { HttpException } from '@/exceptions/HttpException';
import {
    Any,
    ILike,
    In,
    LessThan,
    LessThanOrEqual,
    Like,
    MoreThan,
    MoreThanOrEqual,
    Not,
} from 'typeorm';

const generateWhere = (filter: Filter) => {
    const { prop, operator, value } = filter;
    console.log(operator);
    switch (operator) {
        case 'eq': {
            return { [prop]: value };
        }
        case 'not': {
            return { [prop]: Not(value) };
        }
        case 'lt': {
            return { [prop]: LessThan(value) };
        }
        case 'lte': {
            return { [prop]: LessThanOrEqual(value) };
        }
        case 'mt': {
            return { [prop]: MoreThan(value) };
        }
        case 'mte': {
            return { [prop]: MoreThanOrEqual(value) };
        }
        case 'like': {
            return { [prop]: Like(`%${value}%`) };
        }
        case 'iLike': {
            return { [prop]: ILike(`%${value}%`) };
        }
        case 'in': {
            if (!Array.isArray(value)) {
                return { [prop]: value };
            }
            return { [prop]: In(value) };
        }
        case 'any': {
            if (!Array.isArray(value)) {
                return { [prop]: value };
            }
            return { [prop]: Any(value) };
        }
        default: {
            return { [prop]: value };
        }
    }
};

const generateOrder = (order: Order) => {
    const { prop, direction } = order;
    return { [prop]: direction.toUpperCase() };
};

const queryMiddleware = async (
    req: RequestWithOptions,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { limit, offset, filter, order } = req.query;
        const options: Options = {
            skip: Number(offset) || 0,
            take: Number(limit) || 10,
            where: {},
            order: {},
        };

        const filterArr = filter ? JSON.parse(filter.toString()) : [];
        if (Array.isArray(filterArr)) {
            for (const iterator of filterArr) {
                const { valid, message } = await validation(Filter, iterator);
                if (!valid) {
                    next(new HttpException(400, 'Filter error: ' + message));
                }
                options.where = Object.assign(
                    options.where,
                    generateWhere(iterator),
                );
            }
        }

        const orderArr = order ? JSON.parse(order.toString()) : [];
        if (Array.isArray(orderArr)) {
            for (const iterator of orderArr) {
                const { valid, message } = await validation(Order, iterator);
                if (!valid) {
                    next(new HttpException(400, 'Order error: ' + message));
                }
                options.order = Object.assign(
                    options.order,
                    generateOrder(iterator),
                );
            }
        }

        req.options = options;
        next();
    } catch (error) {
        next(error);
    }
};

export default queryMiddleware;

import { plainToClass } from 'class-transformer';
import {
    validate,
    ValidationArguments,
    ValidationError,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
    if (value === null) {
        return true;
    } else if (typeof value !== 'number' && value === '') {
        return true;
    } else if (typeof value === 'undefined' || value === undefined) {
        return true;
    } else if (
        value !== null &&
        typeof value === 'object' &&
        !Object.keys(value).length
    ) {
        return true;
    } else {
        return false;
    }
};

export const validation = async (
    type: any,
    value: string | number | object,
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
): Promise<{ valid: boolean; message: string }> => {
    return validate(plainToClass(type, value), {
        skipMissingProperties,
        whitelist,
        forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
        if (errors.length > 0) {
            const message = errors
                .map((error: ValidationError) =>
                    Object.values(error.constraints),
                )
                .join(', ');

            return { valid: false, message };
        } else {
            return { valid: true, message: 'null' };
        }
    });
};

@ValidatorConstraint({ name: 'string-or-number', async: false })
export class IsValueFilter implements ValidatorConstraintInterface {
    validate(data: any) {
        return (
            typeof data === 'number' ||
            typeof data === 'string' ||
            Array.isArray(data)
        );
    }

    defaultMessage() {
        return '($value) must be number, string or array';
    }
}

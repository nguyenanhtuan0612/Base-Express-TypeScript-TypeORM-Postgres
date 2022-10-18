import { IsValueFilter } from '@/utils/util';
import { IsDefined, IsIn, IsString, Validate } from 'class-validator';

export class Filter {
    @IsString()
    prop: string;

    @IsString()
    operator: string;

    @IsDefined()
    @Validate(IsValueFilter)
    value: string | number | object;
}

export class Order {
    @IsString()
    prop: string;

    @IsIn(['asc', 'desc'])
    direction: string;
}

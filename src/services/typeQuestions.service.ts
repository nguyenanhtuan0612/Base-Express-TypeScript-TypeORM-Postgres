import { EntityRepository, Repository } from 'typeorm';
import { TypeQuestionEntity } from '@/entities/typeQuestions.entity';
import {
    TypeQuestion,
    TypeQuestionWithCount,
} from '@/interfaces/typeQuestion.interface';
import { CreateTypeQuestionDto } from '@/dtos/typeQuestions.dto';
import { Options } from '@/interfaces/request.interface';

@EntityRepository()
class TypeQuestionService extends Repository<TypeQuestionEntity> {
    public async createNewType(
        dto: CreateTypeQuestionDto,
    ): Promise<TypeQuestion> {
        const data: TypeQuestion = await TypeQuestionEntity.create(dto).save();
        return data;
    }

    public async list(options: Options): Promise<TypeQuestionWithCount> {
        const data = await TypeQuestionEntity.findAndCount(options);
        return { count: data[1], data: data[0] };
    }
}

export default TypeQuestionService;

import { EntityRepository, Repository } from 'typeorm';
import { TypeQuestionEntity } from '@/entities/typeQuestions.entity';
import { TypeQuestion } from '@/interfaces/typeQuestion.interface';
import { CreateTypeQuestionDto } from '@/dtos/typeQuestions.dto';

@EntityRepository()
class TypeQuestionService extends Repository<TypeQuestionEntity> {
    public async createNewType(
        dto: CreateTypeQuestionDto,
    ): Promise<TypeQuestion> {
        const data: TypeQuestion = await TypeQuestionEntity.create(dto).save();
        return data;
    }
}

export default TypeQuestionService;

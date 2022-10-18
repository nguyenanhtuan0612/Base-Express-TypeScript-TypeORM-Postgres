export interface TypeQuestion {
    id: number;
    code: string;
    name: string;
}

export interface TypeQuestionWithCount {
    count: number;
    data: TypeQuestion[];
}

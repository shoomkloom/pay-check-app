export class Group {
    _id: number;
    name: string;
    imageUrl: string;
    masterId: number;
    slaveIds: Array<number>;
    createdDate: Date;
    updatedDate: Date;
}
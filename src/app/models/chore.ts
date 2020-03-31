export class Chore {
    _id: number;
    choreTemplateId: number; //Required
    name: string;
    imageUrl: string;
    details: string;
    masterId: number; //Required
    slaveId: number; //Required
    state: string; //Required: Pending, Done, Reject
    date: Date; //Required
    comment: string;
    createdDate: Date;
    updatedDate: Date;
}
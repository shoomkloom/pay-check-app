export class User {
  constructor(name?: string){
    this.name = name;
  }

  _id: number;
  email: string;
  name: string;
  token: string;
  createdDate: Date;
  updatedDate: Date;
}
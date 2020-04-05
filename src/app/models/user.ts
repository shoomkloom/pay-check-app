export class User {
  constructor(name?: string){
    this.name = name;
  }

  _id: number;
  email: string;
  name: string;
  password: string;
  token: string;
  createdDate: Date;
  updatedDate: Date;

  fullyregestered: boolean;
}
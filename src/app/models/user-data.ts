export class UserData {

  constructor(){
    this.teudathoraa = false;
    this.ofekhadash = false;
    this.zahalhoraa = false;
    this.policehoraa = false;
    this.madrichshelach = false;
  }

  _id: number;
  userid: number;
  
  //regstep01:
  ahuzeimisra: number;
  hachshara: string;
  vetekyears: number;
  teudathoraa: boolean;
  gmuleihishtalmut: string;

  //regstep02:
  ofekhadash: boolean;
  vetekformaly: number;
  vetekformalystart: string;
  veteknotformaly: number;
  vetekzahalpolice: number;
  sadirmonths: number;
  zahalkevayears: number;
  policesherutyears: number;
  zahalhoraa: boolean;
  policehoraa: boolean;
  madrichshelach: boolean;
  vetekprofessional: number;
  vetekminhalit: number;

  //regstep03:
  tlushusercode: string;
  tlushpassword: string;
}
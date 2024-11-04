export class User{
    id?:any;
    name?: string;
    username?: string;
    password?: string;
    age?:number;
    bplace?:string;
    status?:string;
    ageInYears?:number;

    roles?: Role[]; // Az új mező, amely tartalmazza a szerepeket

  constructor(data?: any) {
    this.id = data?.id;
    this.username = data?.username;
    this.password = data?.password;
    this.name = data?.name;
    this.age = data?.age;
    this.bplace = data?.szhely;
    this.status = data?.status;
    this.roles = data?.roles ? data.roles.map((role: any) => new Role(role)) : [];
  }
}

export class Role {
  id?: number;
  name?: string;

  constructor(data?: any) {
    this.id = data?.id;
    this.name = data?.name;
  }
}
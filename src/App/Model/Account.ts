export interface Login {
    email: string;
    password: string;
}

export interface Register  {
    roleName: any;
    id: number;
    name: string;
    email: string;
    password: string;
    tell: number;
    image:string ;
    roleID: number,
    role: Role
}

export interface Role {
    id : number;
    name : any;
}

export const RoleInfo = {
    Admin : "Admin" ,
    User : "User" ,
}

export interface User {
    id:       number;
    name:     string;
    email:    string;
    password: null;
    tell:     string;
    image:    string;
    roleName: string;
}

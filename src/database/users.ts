import _ from "lodash";

export interface IUser {
  id: number;
  uid: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  message: string;
}

export const users: IUser[] = [];

export const usersGraphql = `
type User {
    id: Int
    uid: String
    first_name: String
    last_name: String
    username: String
    email: String
    message: String
  }

  type Query {
    getUser(id:ID): User
  }

  type Mutation {
    updateUser(id: ID!,message:String!): User!
  }
`;


export function getAll(){
    return users;
}

export function getOne(id:string){
    return users.find(_user=>_.toString(_user.id) === _.toString(id));
}

export function createOne(user:IUser){
    users.push(user);
    return user.id;
}

export function update(id:string,user:IUser){
 
}
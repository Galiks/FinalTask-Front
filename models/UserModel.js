import { User } from "./entities/User";

export class UserModel{
    constructor(){
        this.users = new Map()
    }

    /**
     * 
     * @param {number} id 
     * @returns Users
     */
    static getUesrById(id){
        return this.users.get(id)
    }

    /**
     * 
     * @param {{login: string; password: string; userPhoto: Blob; lastVisited: Date}} user 
     * @returns User
     */
    static createUser(user){
        let id = this.users.size + 1
        let newUser = new User(id, user.login, user.password, user.userPhoto, user.lastVisited)
        this.users.set(id, newUser)

        return newUser
    }

    /**
     * 
     * @param {{login: string; password: string; userPhoto: Blob; lastVisited: Date}} user 
     * @returns User
     */
    static updateUser(user){
        let updatingUser = this.getUesrById(user.id)

        updatingUser.login = user.login
        updatingUser.password = user.password
        updatingUser.userPhoto = user.userPhoto
        updatingUser.lastVisited = user.lastVisited

        return updatingUser
    }

    /**
     * 
     * @param {number} id 
     */
    static deleteUser(id){
        this.users.delete(id)
    }
}
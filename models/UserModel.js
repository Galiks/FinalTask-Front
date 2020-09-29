import { User } from "./entities/User.js";

export class UserModel{
    constructor(){
        this.users = new Map()
    }

    /**
     * 
     * @param {number} id 
     * @returns Users
     */
     getUesrById(id){
        return this.users.get(id)
    }

    /**
     * 
     * @param {{login: string; password: string; userPhoto: Blob; lastVisited: Date}} user 
     * @returns User
     */
     createUser(user){
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
     updateUser(user){
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
     deleteUser(id){
        this.users.delete(id)
    }
}
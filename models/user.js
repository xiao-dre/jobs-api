import uuid from 'uuid'
import crypto from 'crypto'

const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class UserModel {
    constructor(userID, userName, userEmail, userUnhashedPassword) {
        this.userID = userID, 
        this.userName = userName, 
        this.userEmail = userEmail, 
        this.userPasswordHash = userPasswordHash
    }

    isValid() {
        if(!(this.userName && this.userName.length >= 4 && test.userName <= 20)) {
            return 0
        }
        if(!(this.userEmail.toLowerCase().match(emailRegEx))) {
            return 0
        }
        return 1
    }

    generateID() {
        return uuid.v4()
    }

    hashPassword(password) {
        return crypto.createHash('sha256').update(password, 'utf-8').digest('hex')
    }

    parseToJson() {
        return {
            userID: this.userID, 
            userName: this.userName, 
            userEmail: this.userEmail, 
            userPasswordHash: this.userPasswordHash
        }
    }
}
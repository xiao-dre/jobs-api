import { v4 as uuidv4 } from 'uuid'

class JobModel {
    constructor(company, position, status, createdBy) {
        this.jobID = this.generateID()
        this.company = company, 
        this.position = position, 
        this.status = status, 
        this.createdBy = createdBy
    }

    isValid() {
        if(!this.company || !(this.company.length <= 50)) {
            return 0
        }
        if(!this.company || !(this.company.length <= 50)) {
            return 0
        }
        if(!this.status || !(this.status == 'interview' || this.status == 'declined')) {
            this.status = 'pending'
        }
        return 1
    }
    generateID() {
        return uuidv4()
    }
    parseToJson() {
        return {
            jobID: this.jobID, 
            company: this.company, 
            position: this.position, 
            status: this.status, 
            createdBy: this.createdBy
        }
    }
}

export default ('Job', JobModel)
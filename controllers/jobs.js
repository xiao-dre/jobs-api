const getAllJobs = (req, res) => {
    res.send('Get All Jobs')
}

const getJob = (req, res) => {
    res.send('Get job')
}

const createJob = (req, res) => {
    res.send('Create job')
} 

const updateJob = (req, res) => {
    res.send('Update Job')
}

const deleteJob = (req, res) => {
    res.send('Delete Job')
}

export {
    getAllJobs, 
    getJob, 
    createJob,
    updateJob,
    deleteJob
}
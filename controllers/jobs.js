import knex from "knex"
import knexConfig from '../knexfile'
import queryPromise from '../db/promises'

const knexConnect = knex(knexConfig.development)

const getAllJobs = async (req, res) => {
    // res.send('Get All Jobs')
    const result = await queryPromise(knexConnect().select('*').from('MsUser'))
    res.send(result)
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
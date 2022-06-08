import knex from "knex"
import knexConfig from '../knexfile'
import queryPromise from '../db/promises'
import httpStatusCode from 'http-status-codes'
import Job from '../models/jobs'
import { BadRequestError } from "../errors"

const knexConnect = knex(knexConfig.development)

const getAllJobs = async (req, res) => {
    // res.send('Get All Jobs')
    const result = await queryPromise(knexConnect().select('*').from('MsUser'))
    res.send(result)
}

const getJob = (req, res) => {
    res.send('Get job')
}

const createJob = async(req, res, next) => {
    let userID = await queryPromise(knexConnect().select('UserID').from('MsUser').where({userName: req.body.user.userName}))
    userID = userID[0].UserID
    delete req.body.user.userPasswordHash
    req.body.user.userID = userID
    const { company, position, status } = req.body
    const job = new Job(company, position, status, userID)
    if(!job.isValid()) {
        return next(new BadRequestError('Credentials not valid'))
    }
    
    await queryPromise(knexConnect().into('MsJob').insert({JobID: job.jobID, company: job.company, position: job.position, status: job.status, userid: job.createdBy}))
    return res.status(httpStatusCode.CREATED).json(req.body)
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
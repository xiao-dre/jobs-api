import knex from "knex"
import knexConfig from '../knexfile'
import queryPromise from '../db/promises'
import httpStatusCode from 'http-status-codes'
import Job from '../models/jobs'
import { BadRequestError } from "../errors"

const knexConnect = knex(knexConfig.development)

const getAllJobs = async (req, res) => {
    const jobs = await queryPromise(knexConnect('MsJob').select('*'))
    return res.status(httpStatusCode.ACCEPTED).json({jobs})
}

const getJob = async(req, res, next) => {
    const jobID = req.params.ID
    const {userName} = req.body.user
    let userID = await queryPromise(knexConnect('MsUser').select('UserID').where({userName: userName}))
    userID = userID[0].UserID
    const job = await queryPromise(knexConnect('MsJob').select('*').where({jobID: jobID, userID: userID}))
    if(!job[0]) {
        return next(new BadRequestError('Job ID with current user not found'))
    }
    return res.status(httpStatusCode.ACCEPTED).json({job})
}

const createJob = async(req, res, next) => {
    let userID = await queryPromise(knexConnect('MsUser').select('UserID').where({userName: req.body.user.userName}))
    userID = userID[0].UserID
    delete req.body.user.userPasswordHash
    req.body.user.userID = userID
    const { company, position, status } = req.body
    const job = new Job(company, position, status, userID)
    if(!job.isValid()) {
        return next(new BadRequestError('Credentials not valid'))
    }
    
    await queryPromise(knexConnect('MsJob').insert({JobID: job.jobID, company: job.company, position: job.position, status: job.status, userid: job.createdBy}))
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
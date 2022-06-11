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

const updateJob = async(req, res, next) => {
    const { jobID, company, position } = req.body
    const { userName } = req.body.user
    if(company === '' || position === '') {
        return next(new BadRequestError('Position or/and Company fields are empty'))
    }
    let userID = await queryPromise(knexConnect('MsUser').select('UserID').where({userName: userName}))
    userID = userID[0].UserID
    await queryPromise(knexConnect('MsJob').where({jobID: jobID, userID: userID}).update({Company: company, Position: position}))
    return res.status(httpStatusCode.ACCEPTED).json(req.body)
}

const deleteJob = async(req, res, next) => {
    const {userName} = req.body.user
    const {jobID} = req.body
    let userID = await queryPromise(knexConnect('MsUser').select('UserID').where({userName: userName}))
    userID = userID[0].UserID
    const result = await queryPromise(knexConnect('MsJob').where({JobID: jobID, UserID: userID}).del())
    if(result == 1) {
        return res.status(httpStatusCode.OK).json({success: true, data: req.body})
    }
    else {
        return next(new BadRequestError('Job not found'))
    }
}

export {
    getAllJobs, 
    getJob, 
    createJob,
    updateJob,
    deleteJob
}
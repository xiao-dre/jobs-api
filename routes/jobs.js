import express from 'express'
import { getAllJobs, getJob, createJob, updateJob, deleteJob } from '../controllers/jobs'

const router = express.Router()

router.route('/').get(getAllJobs).patch(updateJob).post(createJob).delete(deleteJob)
router.route('/:ID').get(getJob)

export default router
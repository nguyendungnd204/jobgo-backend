import {Job} from '../models/job.model.js';
class JobService {
    async postJob({ title, description, requirements, salary, location, jobType, experience, position, companyId }, userId) {
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        })
        if (!job) {
            throw {
                message: "Job not created",
                statusCode: 400,
            };
        }
        return job;
    }

    async getAllJobs(query) {
        const jobs = await Job.find(query).populate({path: 'company'}).sort({createdAt: -1});
        if (!jobs) {
            throw {
                message: "No jobs found",
                statusCode: 404,
            };
        }
        return jobs;
    }

    async getJobById(jobId){
        const job = await Job.findById(jobId);
        return job;
    }

    async getAdminJobs(adminId){
        const jobs = await Job.find({created_by: adminId});
        if (!jobs) {
            throw {
                message: "No jobs found",
                statusCode: 404,
            };
        }
        return jobs;
    }
}

export default new JobService();
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
}

export default new JobService();
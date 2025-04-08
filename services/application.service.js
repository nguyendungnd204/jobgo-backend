import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

class ApplicationService {
     async getApplicationByJobIdAndUserId(jobId, userId) {
        const application = await Application.findOne({ job: jobId, applicant: userId });
        return application;
    }

    async applyJob(jobId, userId, job) {
        const application = await Application.create({ job: jobId, applicant: userId });
        if (!application) {
            throw {
                message: "Application not created",
                statusCode: 400,
            };
        }
        job.applications.push(application._id);
        await job.save();
        return application;
    }

    async getAppliedJobs(userId) {
        const applications = await Application.find({ applicant: userId })
        .populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: {sort: { createdAt: -1 } }
            }
        }).sort({ createdAt: -1 });
        return applications;
    }

    async getApplicantById(jobId) {
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
            }
        })

        return job;
    }

    async getApplicationById(applicationId) {
        const application = await Application.findOne({_id: applicationId })
        return application;
    }

    async updateStatus(application, status) {
        application.status = status;
        await application.save();
        
        return application;
    }
    
}

export default new ApplicationService();
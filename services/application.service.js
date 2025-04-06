import { Application } from "../models/application.model.js";
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
    
}

export default new ApplicationService();
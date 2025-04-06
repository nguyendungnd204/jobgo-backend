import ApplicationService from "../services/application.service.js";
import JobService from "../services/job.service.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.jobId;
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false,
            });
        }
        //check if user already applied for the job
        const existingApplication = await ApplicationService.getApplicationByJobIdAndUserId(jobId, userId);
        if (existingApplication) {
             return res.status(400).json({
                message: "Application already exists",
                success: false,
            });
        }
        //check if job exists
        const job = await JobService.getJobById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }
        const application = await ApplicationService.applyJob(jobId, userId, job);
        res.status(201).json({
            message: "Application created successfully",
            success: true,
            data: application,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

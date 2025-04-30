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
        console.log(job)
        console.log(application)
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

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await ApplicationService.getAppliedJobs(userId);
        
        if (!applications) {
            return res.status(404).json({
                message: "No applications found",
                success: false,
            });
        }

        res.status(200).json({
            message: "Applications fetched successfully",
            success: true,
            data: applications,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await ApplicationService.getApplicantById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        res.status(200).json({
            message: "Applicants fetched successfully",
            success: true,
            data: job.applications,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
     
        if(!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false,
            });
        }

        const application = await ApplicationService.getApplicationById(applicationId);
       
        if(!application){
            return res.status(404).json({
                message: "Not found application",
                success: false,
            })
        }

        const applicationUpdated = await ApplicationService.updateStatus(application, status);
      
        res.status(200).json({
            message: "Application status updated successfully",
            success: true,
            data: applicationUpdated,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

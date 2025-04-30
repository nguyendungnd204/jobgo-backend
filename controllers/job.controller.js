import JobService from "../services/job.service.js";

export const postJob = async (req, res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const job = await JobService.postJob({title, description, requirements, salary, location, jobType, experience, position, companyId }, userId);
        res.status(201).json({
            message: "Job applied successfully",
            success: true,
            data: job
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        }

        const jobs = await JobService.getAllJobs(query);
        res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            data: jobs
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await JobService.getJobById(jobId).populate({
            path:"applications"
        })
        return res.status(200).json({
            message: "Job fetched successfully",
            success: true,
            data: job
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}


export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await JobService.getAdminJobs(adminId);
        res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            data: jobs
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}
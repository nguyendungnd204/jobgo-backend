import jobService from "../services/job.service.js";

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

        const job = await jobService.postJob({title, description, requirements, salary, location, jobType, experience, position, companyId }, userId);
        res.status(201).json({
            message: "Job created successfully",
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
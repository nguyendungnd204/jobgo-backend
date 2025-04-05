import CompanyService from "../services/company.service.js";

export const registerCompany = async (req, res) => {
    try {
        const {companyNamme} = req.body;
        const userId = req.id;
        if (!companyNamme) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }
        let company = await CompanyService.createCompany(userId,companyNamme);
        res.status(201).json({
            message: "Company created successfully",
            success: true,
            data: company
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}
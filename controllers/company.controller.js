import companyService from "../services/company.service.js";
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

export const getAllCompanies = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await CompanyService.getAll(userId);
        res.status(200).json({
            message: "Companies fetched successfully",
            success: true,
            data: companies
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await CompanyService.getCompanyById(companyId);
        return res.status(200).json({
            message: "Company fetched successfully",
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

export const updateCompany = async (req, res) => {
    try {
        const {name, description, website, location} = req.body;
        const file = req.file;
        const companyId = req.params.id;
        const company = await companyService.updateCompany(companyId, name, description, website, location);
        res.status(200).json({
            message: "Company updated successfully",
            success: true,
            data: company
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

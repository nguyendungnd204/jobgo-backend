import CompanyService from "../services/company.service.js";
import cloudinary from "../utils/cloudinary.js";
import getDatauri from "../utils/datauri.js";
//import {createCompany} from "../middlewares/validator.js"

export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        const userId = req.id;

        //const { error } = createCompany.validate({companyNamme});
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }

        let company = await CompanyService.createCompany(userId,companyName);
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
       
        let logo = '';
        if(file){
            const fileUri = getDatauri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }
        
        const company = await CompanyService.updateCompany(companyId, name, description, website, location, logo);
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

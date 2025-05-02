import {Company} from '../models/company.model.js'
class CompanyService {
    async createCompany(userId, companyName) {
        const company = await Company.findOne({companyName});
        if (company) {
            throw {
                message: "Company already exists",
                statusCode: 400,
            };
        }
        const newCompany = await Company.create({
            name: companyName,
            userId: userId,
        })
        return newCompany;
    }

    async getAll(userId){
        const companies = await Company.find({userId});
        if (!companies) {
            throw {
                message: "No companies found",
                statusCode: 404,
            };
        }
        return companies;
    }

    async getCompanyById(companyId){
        const company = await Company.findById(companyId);
        if (!company) {
            throw {
                message: "Company not found",
                statusCode: 404,
            };
        }
        return company;
    }

    async updateCompany(companyId, name, description, website, location, logo){//file
        const company = await Company.findOne({_id: companyId});
        if (!company) {
            throw {
                message: "Company not found",
                statusCode: 404,
            };
        }
        if(name) company.name = name;
        if(website) company.website = website;
        if(location) company.location = location;
        if(description) company.description = description;
        if(logo) company.logo = logo;
        await company.save();
        return company;
    }
}
export default new CompanyService();
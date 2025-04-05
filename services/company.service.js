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
}
export default new CompanyService();
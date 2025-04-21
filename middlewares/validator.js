import joi from 'joi';

exports.registerSchema = joi.object({
    email: joi
    .string()
    .email()
    .required()
    .email()
    .message({
        'any.required': 'Email là bắt buộc'
    }),
    password: joi
    .string()
    .min(6)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).
    message({
        'string.min': 'Password phải có ít nhất 6 ký tự',
        'any.required': 'Password là bắt buộc',
    })
})
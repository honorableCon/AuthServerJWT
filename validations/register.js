const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string()
        .required()
        .max(255)
        .email({ 
            minDomainSegments: 2, 
            tlds: { allow: ['com', 'net', 'tech', 'sn', 'fr', 'org'] } 
        }),
    password: Joi.string()
        .required()
        .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        .message('Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character'),
    role: Joi.string()
        .required()
        .valid('admin', 'user')
        .default('user'),
    status: Joi.string()
        .required()
        .valid('active', 'inactive', 'pending')
        .default('inactive')
});


module.exports = data => schema.validate(data);
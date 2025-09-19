import Joi from 'joi';


const registerSchema = Joi.object({
email: Joi.string().email().optional().allow(null,'').lowercase(),
phone: Joi.string().pattern(/^[0-9+\-() ]{7,20}$/).optional().allow(null,''),
password: Joi.string().min(8).max(128).required(),
role: Joi.string().valid('user','admin').default('user')
});


const loginSchema = Joi.object({
identifier: Joi.string().required(), // email or phone
password: Joi.string().required()
});

export { registerSchema, loginSchema };
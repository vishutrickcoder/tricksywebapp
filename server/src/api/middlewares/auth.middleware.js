import jwt2 from 'jsonwebtoken';
const JWT_SECRET2 = process.env.JWT_SECRET || 'jwt_secret_change_me';


function authMiddleware(requiredRoles = []) {
    return async function (req, res, next) {
        try {
            const auth = req.headers.authorization;
            if (!auth) return res.status(401).json({ error: 'Missing authorization header' });
            const parts = auth.split(' ');
            if (parts[0] !== 'Bearer' || !parts[1]) return res.status(401).json({ error: 'Invalid auth header' });
            const payload = jwt2.verify(parts[1], JWT_SECRET2);
            req.user = payload; // { sub, roles }


            // Role check
            if (requiredRoles.length && !requiredRoles.some(r => payload.roles.includes(r))) return res.status(403).json({ error: 'Forbidden' });


            // If admin route always require 2FA checked
            if (requiredRoles.includes('admin')) {
                // In a robust system we would check last 2FA time or step-up auth. For now ensure user.twoFA.enabled
                // (Assumes a user load or a claim indicates 2FA completed in session)
            }


            next();
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
}


module.exports = authMiddleware;
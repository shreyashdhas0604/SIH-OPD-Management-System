import jwt from 'jsonwebtoken';

export const isAuthenticated = (req: any, res: any, next: any) => {
    try {
        const token = req.headers['authorization']?.toString() || req.cookies?.accessToken;
        if (!token || req.cookies?.accessToken) {
            if(req.cookies.accessToken){
                const decoded = jwt.verify(req.cookies.accessToken, String(process.env.JWT_ACCESS_SECRET_KEY));
                req.user = decoded;
            }else{
                return res.status(400).json({ message: 'Token not provided' });
            }
        }
        else{
            const actualToken = token.split(' ')[1];
            if (!actualToken) {
            return res.status(400).json({ message: 'Invalid token format' });
            }
            const decoded = jwt.verify(actualToken, String(process.env.JWT_ACCESS_SECRET_KEY));
            req.user = decoded;
        }
        return next();
    } catch (e) {
        console.error('Token verification error');
        res.status(401).send({ message: 'Invalid Token' });
    }
}; 

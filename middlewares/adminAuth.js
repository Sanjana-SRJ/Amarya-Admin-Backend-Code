import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { getTokenSessionById } from "../v1/helpers/functions.js";
dotenv.config();

export const authenticateAdminSession = async (req, res, next) => {

    const token = req.body.token || req.params.token || req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];

    if (token) {
        try {
            let decoded, accessDetails, validAccess = false, jwtErrorMessage = '';
            jwt.verify(token, process.env.JWT_SECRET, function (err, verifiedDetails) {
                if (err) {
                    console.log('----------AUTH:ERR FROM AUTH VERIFY FUNCTION----------', err.message);
                    jwtErrorMessage = err.message;
                } else {
                    decoded = verifiedDetails;
                    validAccess = true;
                }
            });

            if (validAccess) {
                //ACCESS DETAILS
                if (decoded.hasOwnProperty('user_id') && decoded.role === "admin") {
                    [accessDetails] = await getTokenSessionById(decoded.user_id);
                    console.log('----------AUTH: ADMIN ACCESS----------');
                }
                //MATCH SESSIONS
                if (accessDetails != null) {
                    if (String(token) === String(accessDetails[0].jwt_token)) {
                        req.decoded = decoded;
                        next();
                    }else {
                        return res.send({
                            statusCode: 440,
                            status: 'failure',
                            message: 'Invalid session.'
                        });
                    }
                } else {
                    return res.send({
                        statusCode: 440,
                        status: 'failure',
                        message: 'Invalid token'
                    });
                }
            } else {
                return res.send({
                    statusCode: 440,
                    status: 'failure',
                    message: `${jwtErrorMessage}, login again`
                });
            }
        } catch (error) {
            console.log('----------AUTH:ERR FROM AUTH MIDDLEWARE----------', error);
            return res.send({
                statusCode: 440,
                status: 'failure',
                message: 'Token auth err'
            });
        }
    } else {
        return res.send({
            statusCode: 449,
            status: 'failure',
            message: 'Please send token in payload or x-access-token header or authorization header.'
        });
    }
}
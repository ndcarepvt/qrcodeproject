import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'] || req.headers['token']; // Support different headers for token

    if (!token) {
        return res.status(401).send({ success: false, message: "Not Authorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user ID to the request body
        req.body.userId = decoded.id;
        next();
    } catch (err) {
        console.error(err);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).send({ success: false, message: "Expired token, please log in again." });
        } else {
            return res.status(401).send({ success: false, message: "Invalid token, please log in again." });
        }
    }
};


const leadMiddleware = (req, res, next) => {
    const token = req.headers['authorization'] || req.headers['token']; // Support different headers for token

    try {

        if (!token) {
            return res.status(401).send({ success: false, message: "Not Authorized" });
        }

        if (token !== process.env.LEAD_SECRET) {
            return res.status(401).send({ success: false, message: "Not Authorized" });
        }

        // Attach decoded user ID to the request body
        req.body.userId = token;
        next();

    } catch (err) {

        console.error(err);
        return res.status(401).send({ success: false, message: "Expired token, please log in again." });

    }
};

export { authMiddleware, leadMiddleware };

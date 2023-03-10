import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
// frontend sending token authorization grabbed from the backend
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }
// if startes with bearer string a space between string
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {

        res.status(500).json({ error: err.message })
    }
}
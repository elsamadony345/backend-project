import jwt from "jsonwebtoken" ;

export const verifyToken = (req, res, next ) => { 
     jwt.verify(req.headers.token, 'samadony', (err , decoded) => {
            if (err) return res.json({message : "error" , err}) ;
                next() ; 
        })
}
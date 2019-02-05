
const usersOnly = (req, res, next) => {
    if(!req.session.user){
        return res.status(401).json('please login')
    }
    next();
}

const adminsOnly = (req,res,next) => {
    if(!req.session.user.isAdmin){
        return res.status(200).json("Youre not a Admin")
    }
    next();
}

module.exports = {
    usersOnly,
    adminsOnly
}
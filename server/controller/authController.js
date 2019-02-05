const bcrypt = require('bcryptjs');


const register  = async (req, res) => {
    const {username, password, isAdmin} = req.body;
    const db = req.app.get('db');
    const result = await db.get_user([username]);
    const existingUser = result[0];
    if(existingUser){
        return res.status(200).json('Username taken')
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt);
    const register_user = await db.register_user([isAdmin, username,hash])
    const user = register_user[0];
    req.session.user = {isAdmin: user.is_admin, username: user.username, id: user.id}
    return res(201).json(req.session.user)
}

const login = async (req, res) => {
    const {username, password} = req.body;
    const foundUser = await req.app.get('db').get_user([username]);
    const user = foundUser[0];
    if(!user){
        return res.status(401).json("User not found please register first")
    }
    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if(!isAuthenticated){
        return res.status(403).json("Incorrect password")
    }
    req.session.user = {isAdmin: user.is_admin, id: user.id, username: user.username}
    return res.json(req.session.user);
}

const logout = async (req,res) => {
    req.session.destroy();
    return res.sendStatus(200)
}



module.exports ={
    register,
    login,
    logout
}


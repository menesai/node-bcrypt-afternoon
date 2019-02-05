
const dragonTreasure = async (req,res,next) => {
    const treasure = await req.app.get('db').get_dragon_treasure(1);
    res.status(200).json(treasure);
}

const getUserTreasure = async (req, res) => {
    const userTreasure = await req.app.get('db').get_user_treasure(req.session.user.id);
    res.status(200).json(userTreasure);
}

addUserTreasure = async (req, res) => {
    const {treasureURL} =req.body;
    const {id} = req.session.user;
    const userTreasure = await req.app.get('db').add_user_treasure([treasureURL, id]);
    return res.status(200).json(userTreasure);

}

const getAllTreasure = async(req,res) => {
    const allTreasure = await req.app.get('db').get_all_treasure();
    return res.status(200).json(allTreasure)
}

module.exports ={
    dragonTreasure,
    getUserTreasure,
    addUserTreasure,
    getAllTreasure
}
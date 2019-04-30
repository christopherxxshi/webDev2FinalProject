const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

router.get('/:id', async (req, res)=>{
    let id = req.params.id;
    try{
        let result = await users.getUserById(id);
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({error: e});
    }
});

router.patch('/:id', async (req, res) =>{
    let id = req.params.id;
    let data = req.body;
    try{
        let result = await users.updateUserById(id,data);
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({error: e});
    }
});

router.post('/', async (req, res)=>{
    let data = req.body;
    try{
        let result = await users.addUser(data);
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({error: e});
    }
});


module.exports = router;

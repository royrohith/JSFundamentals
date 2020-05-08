const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');

//Return JSON
router.get('/', (req,res) => res.json(members))

//Return Single Member
router.get('/:id', (req, res) =>{ 
    const found = members.some( obj => obj.id === parseInt(req.params.id));
    if (found){
    res.json(members
    .filter(obj => obj.id === parseInt(req.params.id)))
    } else {
        res.status(400)
        .json({msg: `Member with ID ${req.params.id} not found`});
    }
});

//Create a Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),    //generate random id to mimin ids created by databases
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if(!newMember.name || !newMember.email) {
        res.status(400).json({msg: 'Please add all values'});
    } else {
        members.push(newMember);
        res.json(members);
        // res.redirect('/')   //incase rendering templates
    }
});

//Updating existing Member
router.put('/:id', (req, res) =>{ 
    const found = members.some( obj => obj.id === parseInt(req.params.id));
    if (found){
    let upMember = req.body;
    members.forEach( member => {
        if(member.id === parseInt(req.params.id)){
            member.name = upMember.name? upMember.name : member.name;
            member.email = upMember.email? upMember.email : member.email;
            res.json({msg: 'Member updated', member});    //member is same as member: member
        }
    });
    } else {
        res.status(400)
        .json({msg: `Member with ID ${req.params.id} not found`});
    }
});

//Delete a member
router.delete('/:id', (req, res) =>{ 
    const found = members.some( obj => obj.id === parseInt(req.params.id));
    if (found){
        const index = members.findIndex((member) => member.id === parseInt(req.params.id));  
        const removed = members.splice(index, 1);
        res.json({msg : 'Member removed', removed, members});
    } else {
        res.status(400)
        .json({msg: `Member with ID ${req.params.id} not found`});
    }
});

module.exports = router;
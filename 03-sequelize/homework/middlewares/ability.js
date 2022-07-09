const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    const { name, mana_cost } = req.body;
    if(!name || !mana_cost) return res.status(404).send('Falta enviar datos obligatorios');
    try{
        const createdAbility = await Ability.create(req.body);
        res.status(201).json(createdAbility);
    }
    catch(err){
        res.status(404).send('Error en alguno de los datos provistos');
    }
});

router.put('/setCharacter', async (req, res) => {
    const { idAbility, codeCharacter } = req.body;
    const ability = await Ability.findByPk(idAbility);
    await ability.setCharacter(codeCharacter);
    res.json(ability);
});

module.exports = router;
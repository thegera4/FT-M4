const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();


router.post('/', async (req, res) => {
    const { code, name, hp, mana } = req.body;
    if(!code || !name || !hp || !mana) return res.status(404).send('Falta enviar datos obligatorios');
    try{
        const createdCharacter = await Character.create(req.body);
        res.status(201).json(createdCharacter);
    } catch(err){
        res.status(404).send('Error en alguno de los datos provistos');
    }
});

router.get('/young', async (req, res) => {
  const characters = await Character.findAll({
    where: {
      age: {
        [Op.lt]: 25
      }
    }
  });
  res.status(200).json(characters);
});

router.get('/', async (req, res) => {
    const { race, age } = req.query;
    const condition = {};
    const where = {};
    
    if(race) where.race = race;
    if(age) where.age = age;

    condition.where = where;
    const characters = await Character.findAll(condition);
    res.json(characters);
    
});

router.get('/:code', async (req, res) => {
    const { code } = req.params;
    const character = await Character.findOne({
        where: {
            code
        }
    });
    if(!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`);
    res.json(character);
});

router.put('/addAbilities', async (req, res) => {
  const { codeCharacter, abilities } = req.body;
  const character = await Character.findByPk(codeCharacter);
  const promises = abilities.map(ability => character.createAbility(ability));
  await Promise.all(promises);
  res.send('Abilities added');
})

router.put('/:attribute', async (req, res) => {
  const { attribute } = req.params;
  const { value } = req.query;
  await Character.update({ [attribute]: value },{
    where: {
      [attribute]: null
    }
  });
  res.send("Personajes actualizados");
});

router.get('/roles/:code', async (req, res) => {
  const { code } = req.params;
  const character = await Character.findByPk(code,{
    include: Role
  });
  res.json(character);
});


module.exports = router;
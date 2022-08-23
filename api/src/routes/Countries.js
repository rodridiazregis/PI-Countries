const { Router } = require('express');
const { Country, Activity } = require('../db');
const router = Router();


router.get('/', async (req, res) => {
  const name = req.query.name;
  const totalCountries = await Country.findAll({
    include: Activity
  });

  if (name) {
    const countryName = await totalCountries.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    countryName.length ?
      res.status(200).send(countryName) :
      res.status(404).send('No encontramos tu país.');
  } else {
    res.status(200).send(totalCountries);
  };
});


router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id.toUpperCase();
    const countryId = await Country.findByPk(id, {
      include: Activity
    });
    // console.log(countryId)
    if (id === countryId.dataValues.id) return res.json(countryId); //the id is a dataValues property of the countryId variable
  } catch (error) {
    res.status(404).send('ID Inválido.');
  };
});


module.exports = router;

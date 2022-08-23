const { Router } = require('express');
const { Country, Activity } = require('../db');
const router = Router();



//using the activiy name for the activities filter selector in the front.
router.get('/', async (req, res) => {
  const allActivities = await Activity.findAll({ include: Country })
  const filterA = allActivities.map(e => e.name.toLowerCase())
  const total = filterA.filter((item, index) => {
      return filterA.indexOf(item) === index;
  })
  console.log(total)
  res.json(total)
});

router.post('/', async (req, res) => {

    const {
      name,
      country,
      difficulty,
      duration,
      season
    } = req.body;

    //name validation - required
    if(!name) {
      console.log('Name required')
      res.status(502).send('Name required')
    };
    
    //duplicate validation
    const activity = await Activity.findAll({
      where: {
        name,
        country
      }
    }); 

    if (!activity.length) {
      const newAct = await Activity.create({
        name,
        country,
        difficulty,
        duration,
        season
      });
      const countryMatch = await Country.findAll({
        where: {
          name: country
        }
      });
      // const addAct = await newAct.addCountries(countryMatch);

      newAct.addCountries(countryMatch)

      // res.status(200).send(addAct);
      res.status(200).send('Created!')
    } else res.status(409).send('We couldnt create your activity. It might already be created.')

});


module.exports = router;

//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require('axios');

// const LoadingDb = require('./src/routes/loadingDB.js')


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    //populing the database in the moment the servitor is up
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiUrl.data.map((e) => {
      return {
        //bringing the information required
        name: e.name.common,
        id: e.cca3,
        capital: e.capital ? e.capital[0] : 'Not found',
        subregion: e.subregion ? e.subregion : 'Not found',
        area: e.area,
        flag: e.flags[1],
        population: e.population,
        continents: e.continents[0]
      };
    });
    apiInfo.forEach(async (e) => {
      await Country.findOrCreate({
        where: {
          name: e.name,
          id: e.id,
          capital: e.capital,
          subregion: e.subregion,
          area: e.area,
          flag: e.flag,
          population: e.population,
          continents: e.continents
        }
      });
    });
    console.log('Server listening at 3001'); // eslint-disable-line no-console
  });
});

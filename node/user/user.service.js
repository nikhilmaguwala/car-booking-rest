const db = require("../models");
const populateUser = async () => {
  try {
    await db.User.destroy({ truncate: true });

    const newUsers = await db.User.bulkCreate([
          { firstName: 'Max', lastName: 'Power', email : 'max@pow.er', birthday: '1980-12-12' },
          { firstName: 'James', lastName: 'Bond', email : 'james@bo.nd', birthday: '1985-12-12' },
    ])
      console.log(' Added to Index Into DataBase ...');
    return newUsers[0]
  } catch (e) {
    console.log(' Error when Adding Users Into Database ... ');
  }
}

module.exports = {
  populateUser
}
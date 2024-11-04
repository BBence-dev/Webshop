module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    ageInYears:{
       type: Sequelize.INTEGER
    },
    age: {
      type: Sequelize.INTEGER
    },
    bplace: {
      type: Sequelize.STRING
    }
  });

  return User;
};

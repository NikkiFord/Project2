module.exports = function(sequelize, DataTypes) {
  let UserList = sequelize.define("UserList", {
    userId: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,140]
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,140]
      }
    },
    items: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1,10000]
      }
    }
  });
  return UserList;
};

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleType: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate(models) {
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          as: 'users'
        });
      }
    }
  });
  return Role;
};

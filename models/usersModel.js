module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("users", {
      name: {
        type: DataTypes.STRING
      },
      otp: {
        type: DataTypes.STRING
      },
      otp_expiration_date: {
        type: DataTypes.DATE
        
      },
      phone_number: {
        type: DataTypes.STRING
      }
    });
    return Users;
  };
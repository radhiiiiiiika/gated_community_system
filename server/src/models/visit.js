const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
const Visit = sequelize.define('Visit', {
id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
name: { type: DataTypes.STRING, allowNull: false },
phone: { type: DataTypes.STRING },
purpose: { type: DataTypes.STRING },
inTime: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
outTime: { type: DataTypes.DATE, allowNull: true },
imageFilename: { type: DataTypes.STRING, allowNull: true },
createdBy: { type: DataTypes.INTEGER, allowNull: true }
});
return Visit;
};
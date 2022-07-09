const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: 'name_mana_cost_unique',
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      required: true,
      unique: 'name_mana_cost_unique',
      validate:{
        min: 10.0,
        max: 250.0
      }
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    summary: {
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.name} (${parseInt(this.mana_cost)} points of mana) - Description: ${this.description}`;
      }
    }
  },
)
}



const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code:{
      type: DataTypes.STRING(5),
      allowNull: false,
      required: true,
      primaryKey: true,
      unique: true,
      validate:{
        isDifferent(value){
          const convertedValue = value.toLowerCase();
          if(convertedValue === 'henry'){
            throw new Error('This code is not allowed');
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      required: true,
      validate: {
        notIn: [["Henry", "SoyHenry", "Soy Henry"]]
      }
    },
    age:{
      type: DataTypes.INTEGER,
      defaultValue: null,
      get(){
        const rawValue = this.getDataValue('age');
        return  rawValue ? rawValue + ' years old' : null;
      }

    },
    race: {
      type: DataTypes.ENUM,
      values:['Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'],
      defaultValue: 'Other',
    },
    hp:{
      type: DataTypes.FLOAT,
      require: true,
      allowNull: false
    },
    mana:{
      type: DataTypes.FLOAT,
      require: true,
      allowNull: false
    },
    date_added: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
  })
}
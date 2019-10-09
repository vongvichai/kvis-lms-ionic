const Model = require('Sequelize').Model;

module.exports = (sequelize, DataType) => {
    class myModel extends Model {};
    myModel.init({
        // attributes
        firstName: {
            type: DataType.STRING,
            allowNull: false
        },
        lastName: {
            type: DataType.STRING
                // allowNull defaults to true
        }
    }, {
        sequelize,
        modelName: 'myModel'
            // options
    });
    return myModel;
};
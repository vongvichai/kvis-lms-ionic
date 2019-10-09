module.exports = (sequelize, DataType) => {
    "use strict";
    const Matthayoms = sequelize.define("Matthayoms", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        klass: {
            type: DataType.ENUM('ปีที 4', 'ปีที 5', 'ปีที 6'),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        room: {
            type: DataType.ENUM(1, 2, 3, 4),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: true,
        underscored: true
    });
    return Matthayoms;
};

/*
{ "_id" : ObjectId("5c3ef7b333c8fb03873a7f4a"), "matthayom" : 4, "room" : 1 }
{ "_id" : ObjectId("5c3ef7c333c8fb03873a7f4b"), "matthayom" : 4, "room" : 2 }
{ "_id" : ObjectId("5c3ef7c533c8fb03873a7f4c"), "matthayom" : 4, "room" : 3 }
{ "_id" : ObjectId("5c3ef7cb33c8fb03873a7f4d"), "matthayom" : 4, "room" : 4 }
{ "_id" : ObjectId("5c3ef7d133c8fb03873a7f4e"), "matthayom" : 5, "room" : 4 }
{ "_id" : ObjectId("5c3ef7d533c8fb03873a7f4f"), "matthayom" : 5, "room" : 3 }
{ "_id" : ObjectId("5c3ef7e133c8fb03873a7f51"), "matthayom" : 5, "room" : 2 }
{ "_id" : ObjectId("5c3ef7e533c8fb03873a7f52"), "matthayom" : 5, "room" : 1 }
{ "_id" : ObjectId("5c3ef7ea33c8fb03873a7f53"), "matthayom" : 6, "room" : 1 }
{ "_id" : ObjectId("5c3ef7ed33c8fb03873a7f54"), "matthayom" : 6, "room" : 2 }
{ "_id" : ObjectId("5c3ef7f033c8fb03873a7f55"), "matthayom" : 6, "room" : 3 }
{ "_id" : ObjectId("5c3ef7f233c8fb03873a7f56"), "matthayom" : 6, "room" : 4 }
*/
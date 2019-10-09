const Sequelize = require("sequelize");

const sequelize = new Sequelize('kvislms.sqlite', '', '', {
    database: "kvis-lms",
    username: "admin",
    password: "123456",
    params: {
        dialect: "sqlite",
        storage: "kvislms.sqlite",
        logging: false,
        define: {
            underscored: true
        }
    },
    jwtSecret: "asdfsafsafsafsafsafsafsafd",
    jwtSession: { session: false }
});

const Users = sequelize.define("Users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    hooks: {
        beforeCreate: user => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }
});
// Users.associate = (models) => {
//     Users.hasMany(models.Tasks);
// };
Users.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
};

// Users.sync({ force: true });
sequelize.query(`
        select 
            lower(rtrim(empcode)) as empcode, 
            lower(rtrim(empcode)) + right(CTZN_ID,4) as pwd 
        from EMPLOYEE 
        where CTZN_ID is not null and EMP_STATUS = 1`)
    .then(employees => {
        //console.log(employees[0])
        employees[0].map(emp => {
            Users.create({
                name: emp.empcode,
                password: emp.pwd,
                email: emp.empcode + "@yss.co.th"
            });
        });
    });
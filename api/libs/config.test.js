/**
 * Created by M.C on 2017/9/20.
 */
module.exports = {
    database: "kvislms-test",
    username: "admin",
    password: "123456",
    params: {
        dialect: "sqlite",
        storage: "kvislms-test.sqlite",
        logging: false,
        define: {
            underscored: true
        }
    },
    jwtSecret: "asdfsafsafsafsafsafsafsafd",
    jwtSession: { session: false }
};
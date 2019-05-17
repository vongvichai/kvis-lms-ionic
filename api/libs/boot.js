module.exports = app => {
    "use strict";
    if (process.env.NODE_ENV !== "test") {

        const PORT = app.get("port");
        app.db.sequelize.sync()
            .then(() => {
                const server = app.listen(PORT, () => {
                    const host = server.address().address;
                    const dbHost = app.db.sequelize.config.host;
                    const dbName = app.db.sequelize.config.database;
                    console.log(`KVIS LMS API - Host: ${host} Port: ${PORT}`);
                    console.log(`Run at DB Server: ${dbHost} Database: ${dbName}`);
                });
            })
            .error(err => {
                if (err) {
                    console.log('Database connection error.');
                    throw err;
                }
            });
    } else {
        app.db.sequelize.sync( /*{ force: true }*/ ).done();
    }
};
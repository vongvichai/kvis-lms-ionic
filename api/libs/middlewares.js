/**
 * Created by M.C on 2017/9/15.
 */
import bodyParser from "body-parser"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import logger from "./logger"
import compression from "compression"
import helmet from "helmet"

module.exports = app => {
    "use strict";
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.use(morgan("common", {
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    }));
    app.use(helmet());

    const whitelist = ['http://localhost:3001', 'http://127.0.0.1:3001', 'http://192.168.100.91:3001'];
    const corsOptions = {
        origin: function(origin, callback) {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error(`${origin} not allowed by CORS.`));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"]
    };
    app.use(cors(corsOptions));

    app.use(compression());
    app.use(bodyParser.json());
    app.use(app.auth.initialize());

    app.use((req, res, next) => {
        console.log(`headers: ${JSON.stringify(req.headers)},\n body: ${JSON.stringify(req.body)}, params: ${JSON.stringify(req.params)}`);
        if (req.body && req.body.id) {
            delete req.body.id;
        }
        next();
    });

    app.use(express.static("public"));
};
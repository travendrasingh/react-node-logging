var express = require('express');
const { register, getUser, getUsersCount } = require('../biz/users');
var fs = require('fs')
var multer = require('multer')
var path = require('path')

exports.Users = function (app) {
    const api = express.Router({ mergeParams: true });

    const upload = multer({
        storage: multer.diskStorage({
            destination(req, file, cb) {
                const dir = 'public/img/users/';
                const filePath = dir + req.body.mobile + "_" + file.originalname
                if (fs.existsSync(filePath)) {
                    if (fs.statSync(filePath).isFile())
                        fs.unlinkSync(filePath);
                }

                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                cb(null, dir);
            },
            filename(req, file, cb) {
                const fileName = req.body.mobile + "_" + file.originalname;
                cb(null, fileName);
            },
        }),
    })

    api.post('/register', upload.single('photo'), (req, res) => {
        register(res, req.body)
    });

    api.post('/getUser', (req, res) => {
        getUser(res, req.body)
    });

    api.get('/getUsersCount', (req, res) => {
        getUsersCount(res, req.body)
    });

    app.use("/users", api);
}
var { sequelize } = require('../db');
const { Response } = require('./response');
const { ErrorMsg } = require('./constants');
var logger = require('../../WinstonLogger');

exports.getUser = (res, data) => {
    console.log(data);
    query = "call sp_get_user(:in_mobile_no);";

    sequelize.query(query,
        {
            replacements: {
                in_mobile_no: data.mobile,
            },
            type: sequelize.QueryTypes.SELECT
        }
    ).then(x => {
        const returnData = x && x[0] ? Object.values(x[0]) : '';
        if (returnData !== '' && returnData !== undefined && returnData.length > 0) {
            Response(res, 200, ErrorMsg.e200, returnData);
        } else {
            Response(res, 200, ErrorMsg.e202, '');
        }
    }).catch(function (err) {
        logger.error(err)
        Response(res, 400, ErrorMsg.e400, err);
    });
}

exports.getUsersCount = (res, req) => {
    query = "call sp_get_users_count();";

    sequelize.query(query,
        {
            type: sequelize.QueryTypes.SELECT
        }
    ).then(x => {
        const returnData = x && x[0] ? Object.values(x[0]) : '';
        if (returnData !== '' && returnData !== undefined) {
            Response(res, 200, ErrorMsg.e200, returnData);
        } else {
            Response(res, 200, ErrorMsg.e201, '');
        }
    }).catch(function (err) {
        logger.error(err)
        Response(res, 400, ErrorMsg.e400, err);
    });
}

exports.register = function (res, data) {
    query = "call sp_manage_user (:in_name, :in_mobile_no, :in_image_path, @out_id); \
    select @out_id;";
    sequelize.query(query,
        {
            replacements: {
                in_name: data.name,
                in_mobile_no: data.mobile,
                in_image_path: "/public/img/users/" + data.mobile + "_" + data.file_name,
            },
            type: sequelize.QueryTypes.SELECT
        }
    ).then(x => {
        console.log(x[1])
        const return_code = x && x[1] && x[1][0] ? x[1][0]['@out_id'] : -1;
        if (return_code > 0) {
            Response(res, 200, ErrorMsg.e204, '');
        }
        else {
            Response(res, 300, ErrorMsg.e203, '');
        }
    }).catch(function (err) {
        logger.error(err);
        Response(res, 400, ErrorMsg.e400, err);
    });
}
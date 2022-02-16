var { sequelize } = require('../db');
const { Response } = require('./response');
const { ErrorMsg } = require('./constants');
var logger = require('../../WinstonLogger');

exports.BlockUserSelectedSlot = async (res, data) => {
    await sequelize.transaction(async transaction => {
        try {
            await sequelize.query("INSERT INTO `tr_agent_slot_booking_hold` (`slot_id`, `agent_id`, `customer_id`, `dtti_created`, `dtti_expire`) \
            VALUES(:in_slot_id, :in_agent_id, :in_customer_id, NOW(), DATE_ADD(NOW(),INTERVAL 05 MINUTE));",
                {
                    transaction,
                    replacements: {
                        in_slot_id: data.slot_id,
                        in_agent_id: data.agent_id,
                        in_customer_id: data.customer_id,
                    },
                    type: sequelize.QueryTypes.INSERT
                }
            )
            await sequelize.query("UPDATE `ms_agent_slots` SET `slot_status_id` = :in_slot_status_id \
                WHERE `slot_id` = :in_slot_id AND `agent_id` = :in_agent_id;",
                {
                    transaction,
                    replacements: {
                        in_slot_status_id: data.slot_status_id,
                        in_slot_id: data.slot_id,
                        in_agent_id: data.agent_id,
                    },
                    type: sequelize.QueryTypes.UPDATE
                }
            )
            await transaction.commit();
            Response(res, 200, ErrorMsg.e200, '');
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
            }
            logger.error(err)
            Response(res, 400, ErrorMsg.e400, err);
        }
    })
}

exports.BookUserSelectedSlot = async (res, data) => {
    await sequelize.transaction(async transaction => {
        try {
            await sequelize.query("INSERT INTO `tr_agent_slot_booking` (`slot_id`, `agent_id`, `booking_code`, `customer_id`, `dtti_created`) \
                VALUES(:in_slot_id, :in_agent_id, :in_booking_code, :in_customer_id, NOW());",
                {
                    transaction,
                    replacements: {
                        in_slot_id: data.slot_id,
                        in_agent_id: data.agent_id,
                        in_booking_code: data.booking_code,
                        in_customer_id: data.customer_id,
                    },
                    type: sequelize.QueryTypes.INSERT
                }
            )
            await sequelize.query("UPDATE `ms_agent_slots` SET `slot_status_id` = :in_slot_status_id \
                WHERE `slot_id` = :in_slot_id AND `agent_id` = :in_agent_id;",
                {
                    transaction,
                    replacements: {
                        in_slot_status_id: data.slot_status_id,
                        in_slot_id: data.slot_id,
                        in_agent_id: data.agent_id,
                    },
                    type: sequelize.QueryTypes.UPDATE
                }
            )
            await sequelize.query("DELETE FROM `tr_agent_slot_booking_hold` \
                WHERE `slot_id` = :in_slot_id AND `agent_id` = :in_agent_id;",
                {
                    transaction,
                    replacements: {
                        in_slot_id: data.slot_id,
                        in_agent_id: data.agent_id,
                    },
                    type: sequelize.QueryTypes.DELETE
                }
            )
            await transaction.commit();
            Response(res, 200, ErrorMsg.e200, '');
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
            }
            logger.error(err)
            Response(res, 400, ErrorMsg.e400, err);
        }
    })
}
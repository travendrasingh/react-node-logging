var express = require('express');
const { BlockUserSelectedSlot, BookUserSelectedSlot } = require('../biz/slot_booking');

exports.SlotBooking = function (app) {
    const api = express.Router({ mergeParams: true });

    api.get('/block_user_selected_slot', async (req, res) => {
        let data = {
            slot_id: 1,
            agent_id: 1,
            customer_id: 1,
            slot_status_id: 2
        }
        await BlockUserSelectedSlot(res, data)
    });

    api.get('/book_user_selected_slot', async (req, res) => {
        let data = {
            slot_id: 1,
            agent_id: 1,
            customer_id: 1,
            slot_status_id: 3,
            booking_code: 'GA2358H9'
        }
        await BookUserSelectedSlot(res, data)
    });

    app.use("/booking-slot", api);
}
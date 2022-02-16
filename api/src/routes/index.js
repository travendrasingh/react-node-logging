const { Users } = require('./users');
const { SlotBooking } = require('./slot_booking');

exports.routes = function (app) {
    Users(app);   
    SlotBooking(app);
}
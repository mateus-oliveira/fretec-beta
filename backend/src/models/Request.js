const { Schema, model } = require('mongoose');

const RequestSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: JSON,
        required: true,
    },
});

module.exports = model('Request', RequestSchema);
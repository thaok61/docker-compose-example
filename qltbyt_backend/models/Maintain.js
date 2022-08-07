const mongoose = require('mongoose');

const MaintainSchema = new mongoose.Schema({
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'device',
        required: true,
    },
    cost: {
        type: String,
        required: true,
    },
    previousStatus: {
        type: String,
        required: true,
    },
    afterStatus: {
        type: String,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
    }
    
})

module.exports = Maintain = mongoose.model('maintain', MaintainSchema);
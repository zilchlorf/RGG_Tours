const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourBookingSchema = new Schema({
    bookingName: {
        type: String,
        required: true
    },
    bookingTime: {
        type: Date,
        required: true
    },
    bookingRegion: {
        type: String,
        enum: mongoose.model("PastTours").regions.map(({ id }) => id),
        required: true
    },
    bookingType: {
        type: String,
        enum: [
            "Winery",
            "Brewery",
            "Dispensary",
            "Combo",
            "Surprise Me!"
        ],
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},
    {
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: (doc, ret) => {
                delete ret._id;
            }
        }
    });

const TourBooking = mongoose.model("TourBooking", tourBookingSchema);
module.exports = TourBooking;
const { Schema, model } = require("mongoose");

const StoreSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    location: {
        longitude: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        }
    },
    categories: [{
        type: String,
        required: true,
        trim: true
    }],
    keysWords: [{
        type: String,
        trim: true,
        required: true,
    }],
    visits:{
        type: Number,
        default: 0
    },
    img: {
        type: String,
    },
});

StoreSchema.methods.toJSON = function() {
    const { __v, password, _id, ...store } = this.toObject();
  
    store.uid = _id;
  
    return store;
}

module.exports = model("Store", StoreSchema);
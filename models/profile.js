const { Schema, model } = require("mongoose");

const ProfileSchema = Schema({
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
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

ProfileSchema.methods.toJSON = function() {
    const { __v, password, _id, ...profile } = this.toObject();
  
    profile.uid = _id;
  
    return profile;
}

module.exports = model("Profile", ProfileSchema);


postTicket = async (req, res) => {
    // 1- obtetener data de productos, tienda y valor total
    // 2- crear el ticket con productos, tienda y valor total
    // 3- Obtener categirias y keywords de la tienda 
    // 3- crear preferencia con categorias y keywords 
}


getPreferences = async (req, res) => {
    // groupBy categorias y keçywords 

    // ropa : 35
    // zapatos : 22
    // tech : 10
    // total : 67
}


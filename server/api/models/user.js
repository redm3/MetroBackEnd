const mongoose = require('mongoose')
const schema = mongoose.Schema


const userSchema = new schema({
    id:{
        type:Number,
        required:false,
        unique: true,
        default: -1
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    name:{
        firstname:{
            type:String,
            required:false
        },
        lastname:{
            type:String,
            required:false
        }
    },
    address:{
        city:String,
        street:String,
        number:Number,
        zipcode:String,


/*         geolocation:{
            lat:String,
            long:String
        } */
    },
/*     phone:String,
    admin: Boolean */
})
userSchema.pre('save', async function (next) {
    if (this.isNew) {
      const maxId = (await this.constructor.findOne({}).sort({ id: -1 }))?.id || 0;
      this.id = maxId + 1;
    }
    next();
  });
  
module.exports = mongoose.model('user',userSchema)
const mongoose=require("mongoose")

const empSchema=mongoose.Schema({
    Firstname:String,
    Lastname:String,
    Email:String,
    Department:String,
    Salary:String
},{
    versionKey:false
})

const empModel=mongoose.model("employee",empSchema);

module.exports={
    empModel
}


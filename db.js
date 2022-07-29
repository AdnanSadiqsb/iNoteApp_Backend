const mongoose=require('mongoose')

const mongoURL='mongodb+srv://adnansadiq:fa19bse036@cluster0.v1frm.mongodb.net/test?authSource=admin&replicaSet=atlas-8p440y-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

const connectToMongo=()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("connected to mongoose success fuly")
    })
    console.log("hlo")
}

module.exports= connectToMongo;

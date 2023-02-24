const mongoose = require('mongoose')
const dotenv = require('dotenv')
var users = require('./data/users')
var products = require('./data/products')
var User = require( './models/user')
var Product =require( './models/product')
var Order =require( './models/order')
const connectDB = require('./db');

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error('error')
        process.exit(1)
    }
};

if (process.argv[2] === '-d') {
    destroyData().then(() => console.log("finished destroy"))
} else {
    importData().then(() => console.log("finished import"))
}

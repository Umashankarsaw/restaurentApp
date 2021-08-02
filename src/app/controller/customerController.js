const DB = require('../../config/db');
const Customer = require('../model/customerModel');
const ErrorHandler = require('../errors/ErrorHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRETKEY} = require('../../config/config');
const mongoDb = require('mongodb');

const ObjectID = mongoDb.ObjectId;
const customer = {
    async create(req, res, next) {
        var salt=101;
        try {
           var hash= await hashPassword(req.body);

            var customer = new Customer(req.body);
            customer._id= new ObjectID;
            console.log(customer);
            customer.password=hash;
            await customer.save();
            console.log(customer);
            res.json({ status: 'OK' });
        } catch (err) {
            next(ErrorHandler.serverError(err.message));
        }
       

    },
    async update(req, res, next) {
        try {
            console.log(req.params);
            let rId = req.params.id;

            const filter = { _id: rId };
            const update = req.body;
            if(typeof update['password'] !=='undefined')
                delete update['password']
            //var customer = await Customer.findOne({_id:rId});
            let customer = await Customer.findOneAndUpdate(filter, update);
            console.log(customer);
            if (customer) {
                res.json({ status: '0', message: "Updated successfully", data: customer });
            } else {
                next(ErrorHandler.serverError("Somthing working"));
            }

        } catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    },
    async login(req, res, next) {
        try {
            console.log(req.params);
            let email = req.body.email;

            const filter = { email: email };
            const postData = req.body;

            //var customer = await Customer.findOne({_id:rId});
            let customer = await Customer.findOne(filter);
            console.log(SECRETKEY);
            if (customer) {
                var comparePass = bcrypt.compareSync(postData.password,customer.password);
                if(comparePass){
                    var token = jwt.sign({
                        id:customer._id,
                        name:customer.name,
                        email:customer.email
                    },
                    SECRETKEY,
                    {expiresIn:'12h'}
                )

                    res.json({ status: '1',token:token, message: "Login successfully" });
                }else{
                    res.json({ status: '0',token:token, message: "Login failed" });
                }
                
            } else {
                next(ErrorHandler.serverError("Somthing working"));
            }

        } catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    },
    async delete(req, res, next) {
        try {
            var customer = await Customer.findByIdAndRemove(req.params.id);
            if (customer) {
                res.status(200).json({ status: '1', message: "Deleted successfully", data: customer });
            } else {
                next(ErrorHandler.notFoundError("Somthing wrong"));
            }

        } catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    },
    search(req, res) {
        res.send("Hello workd")
        console.log("Hello World");

    },


}
async function hashPassword (data) {

    const password = data.password
    const saltRounds = 10;
  
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
  }
module.exports = customer;
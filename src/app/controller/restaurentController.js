const DB = require('../../config/db');
const Restaurent = require('../model/restaurentModel');
const ErrorHandler = require('../errors/ErrorHandler');
const restaurent = {
    async create(req, res, next) {

        try {
            console.log(req.body);
            var restaurent = new Restaurent(req.body);
            await restaurent.save();
            console.log(restaurent);
            res.json({ status: 'OK' });
        } catch (err) {
            next(ErrorHandler.serverError(err.message));
        }
        // next();

    },
    async update(req, res, next) {
        try {
            console.log(req.params);
            let rId = req.params.id;

            const filter = { _id: rId };
            const update = req.body;

            //var restaurent = await Restaurent.findOne({_id:rId});
            let restaurent = await Restaurent.findOneAndUpdate(filter, update);
            console.log(restaurent);
            if (restaurent) {
                res.json({ status: '0', message: "Updated successfully", data: restaurent });
            } else {
                next(ErrorHandler.serverError("Somthing working"));
            }

        } catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    },
    async delete(req, res, next) {
        try {
            var restaurent = await Restaurent.findByIdAndRemove(req.params.id);
            if (restaurent) {
                res.status(200).json({ status: '1', message: "Deleted successfully", data: restaurent });
            } else {
                next(ErrorHandler.notFoundError("Somthing wrong"));
            }

        } catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    },
    async search(req, res, next) {
        console.log(req.query);
        try {
            console.log(req.params);
            let rId = req.params.id;
           
           const {name,cuisine, location, menu} = req.query;
            console.log(menu);
            let restaurents = await Restaurent.find({
                name:{$regex:'.*'+name+'.*'},
                cuisine:{$elemMatch:{$regex:'.*'+cuisine+'.*'}},
                // address:{$elemMatch:{city:{$regex:'.*'+location+'.*'},streetName:{$regex:'.*'+location+'.*'}}}
            }).populate("menus",{match:{name:{$regex:'.*'+menu+'.*'}}}).exec();
          
            if (restaurents) {
                res.json({ status: '1', message: "Data fetched successfully", data: restaurents });
            } else {
                next(ErrorHandler.serverError("Somthing working"));
            }

        } catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    }
}

module.exports = restaurent;
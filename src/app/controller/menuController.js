const DB = require('../../config/db');
const Menu = require('../model/menuModel');
const ErrorHandler = require('../errors/ErrorHandler');
const mongoDb = require('mongodb');

const ObjectID = mongoDb.ObjectId;
const menu = {
    async create(req, res, next) {

        try {
            console.log(req.body);
            var menu = new Menu(req.body);
            menu._id=new ObjectID;
            await menu.save();
            console.log(menu);
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

            //var menu = await Menu.findOne({_id:rId});
            let menu = await Menu.findOneAndUpdate(filter, update);
            console.log(menu);
            if (menu) {
                res.json({ status: '0', message: "Updated successfully", data: menu });
            } else {
                next(ErrorHandler.serverError("Somthing working"));
            }

        } catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    },
    async delete(req, res, next) {
        try {
            var menu = await Menu.findByIdAndRemove(req.params.id);
            if (menu) {
                res.status(200).json({ status: '1', message: "Deleted successfully", data: menu });
            } else {
                next(ErrorHandler.notFoundError("Somthing wrong"));
            }

        } catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    },
    async search(req, res) {
        let menusList = await Menu.find({})
        res.status(200).json({ status: '1', message: "Fetched successfully", data: menusList });
    }
}

module.exports = menu;
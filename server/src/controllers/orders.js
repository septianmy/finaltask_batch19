const { users, hiring : Hirings } = require("../../models");
const Joi = require("joi");
const resourceNotFound = "Resource Not Found";
const responseSuccess = "Success";

exports.getOrders = async (req, res) => {
    try {
        const orders = await Hirings.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt","hiringBy", "hiringTo"],
            },
            include: [{
                model: users,
                as: "orderBy",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            }, {
                model: users,
                as: "orderTo",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            }]
        });

        if(!orders){
            return res.status(400).send({
                status: resourceNotFound,
                data: {
                    orders: [],
                }
            });
        }

        res.send({
            status: responseSuccess,
            message: "Orders successfully get",
            data : {
                orders
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: {
                message: "Server Error Posts",
            },
        });
    }
};

exports.addOrder = async (req,res) => {
    try {
        const hired = await Hirings.create({
            title : req.body.title,
            description : req.body.description,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            price: req.body.price,
            hiringBy:req.body.hiringBy,
            hiringTo:req.body.hiringTo,
            status:"waiting",
        });

        res.send({
            message : "Response Success",
            data : {
                hired
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: {
                message: "Server Error",
            },
        });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const {id} = req.params;

        const orders = await Hirings.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt","hiringBy", "hiringTo"],
            },
            where : {
                hiringTo : id,
            },
            include: [{
                model: users,
                as: "orderBy",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            }, {
                model: users,
                as: "orderTo",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            }]
        });

        if(orders.length === 0){
            return res.status(400).send({
                status: resourceNotFound,
                message : "No ordering",
                data: {
                    orders: [],
                }
            });
        }

        res.send({
            status: responseSuccess,
            message: "Orders successfully get",
            data : {
                orders
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: {
                message: "Server Error Posts",
            },
        });
    }
};

exports.getOfferById = async (req, res) => {
    try {
        const {id} = req.params;

        const orders = await Hirings.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt","hiringBy", "hiringTo"],
            },
            where : {
                hiringBy : id,
            },
            include: [{
                model: users,
                as: "orderBy",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            }, {
                model: users,
                as: "orderTo",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            }]
        });

        if(orders.length === 0){
            return res.status(400).send({
                status: resourceNotFound,
                message : "No ordering",
                data: {
                    orders: [],
                }
            });
        }

        res.send({
            status: responseSuccess,
            message: "Orders successfully get",
            data : {
                orders
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: {
                message: "Server Error Posts",
            },
        });
    }
};
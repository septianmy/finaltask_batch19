const { users, posts, arts, photos } = require("../../models");
const resourceNotFound = "Resource Not Found";
const responseSuccess = "Success";

exports.getProfile = async (req,res) => {
    try {
        const {id} = req.params
        const user = await users.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            },
            where: {
                id,
            },
            include : [{
                model: posts, as: "posts", attributes :['id','title','description'],
                include: [{model:photos, as: "photos", separate:true, attributes:['id','image'], limit:1}]
            },{
                model: arts, as: "arts", attributes:['id','image']
            }],
        });

        if(!user){
            return res.status(400).send({
                status: resourceNotFound,
                data: {
                    user: null,
                }
            });
        }

        res.send({
            status: responseSuccess,
            message: "User successfully get",
            data : {
                user
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
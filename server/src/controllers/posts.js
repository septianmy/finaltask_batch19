const { users, photos, posts: Posts } = require("../../models");
const resourceNotFound = "Resource Not Found";
const responseSuccess = "Success";

exports.getPosts = async (req, res) => {
    try {
        const posts = await Posts.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: [{
                model: photos,
                as: "photos",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            }, {
                model: users,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            }]
        });

        if(!posts){
            return res.status(400).send({
                status: resourceNotFound,
                data: {
                    posts: [],
                }
            });
        }

        res.send({
            status: responseSuccess,
            message: "Posts successfully get",
            data : {
                posts
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
const questionRoutes = require("./questions");
const userRoute = require("./users");

const routes = app => {
    app.use("/api/user", userRoute);
    //app.use("/api/question", questionRoutes);

    app.use('*', (req,res)=>{
        res.status(404).json({error: "URL not found"});
    })
};

module.exports = routes;
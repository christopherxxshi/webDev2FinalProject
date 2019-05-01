const questionRoutes = require("./questions");
const userRoute = require("./users");
const techTypes = require("../data/techTypes");

const routes = app => {
    app.use("/api/user", userRoute);
    app.use("/api/question", questionRoutes);

    app.get("/api/language", (req, res)=>{
        res.status(200).json(techTypes);
    });

    app.use('*', (req,res)=>{
        res.status(404).json({error: "URL not found"});
    });
};

module.exports = routes;
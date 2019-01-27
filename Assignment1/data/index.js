const mongoCollections = require("../setting/mongoCollection");
const tasks = mongoCollections.tasks;
const uuidv1 = require('uuid/v1');

module.exports = {

    async createTask(task) {

        // console.log(task);

        const mongoCollections = await tasks();

        let data = task;

        let msgObj = {};
        let count = 0;

        if (!uuidv1) {
            count++;
            msgObj[`message${count}`] = "Sorry could not generate Unique Id for New Task";
        }

        if (this.isEmpty(msgObj)) {

            // console.log("typeof data.title" + typeof data.title);
            // console.log("typeof data.hoursEstimated" + typeof data.hoursEstimated);


            if (!data.hasOwnProperty("title")) {
                count++;
                msgObj[`message${count}`] = "Title field is require for creation of task";
            } else if (typeof data.title != "string") {
                count++;
                msgObj[`message${count}`] = "Title field must be a String for creation of task";
            }

            if (!data.hasOwnProperty("description")) {
                count++;
                msgObj[`message${count}`] = "Description field is require for creation of task";
            } else if (typeof data.description != "string") {
                count++;
                msgObj[`message${count}`] = "Description field must be a String for creation of task";
            }

            if (!data.hasOwnProperty("hoursEstimated")) {
                count++;
                msgObj[`message${count}`] = "Hours Estimated field is require for creation of task";
            } else if (typeof data.hoursEstimated != "number") {
                count++;
                msgObj[`message${count}`] = "Hours Estimated field must be a Number not a string for creation of task";
            }

            if (!data.hasOwnProperty("completed")) {
                count++;
                msgObj[`message${count}`] = "Task Completion field is require for creation of task";
            }
            else if (typeof data.completed != "boolean") {
                count++;
                msgObj[`message${count}`] = "Task Completion field must be either 'true' or 'false for creation of task";
            }

            data["_id"] = uuidv1();
            if (!data.hasOwnProperty("comments")) {
                count++;
                msgObj[`message${count}`] = "Comment field is require for creation of task";
            }
            else if (data.comments.length == 0) {
                count++;
                msgObj[`message${count}`] = "Comment field is empty, please provide coments for creation of task";
            }
            else {

                // console.log(data.comments);
                let length = data.comments.length;

                for (let i = 0; i < length; i++) {

                    if (!data.comments[i].hasOwnProperty("name")) {
                        count++;
                        msgObj[`message${count}`] = "Person's name  field is required in comment for creation of task";
                        break;
                    }
                    else if (typeof data.comments[i].name != "string") {
                        count++;
                        msgObj[`message${count}`] = "Person's name must be a String for comment";
                        break;
                    }

                    if (!data.comments[i].hasOwnProperty("comment")) {
                        count++;
                        msgObj[`message${count}`] = `${data.comments[i].name}'s comment is required for creation of task.`;
                        break;
                    }
                    else if (typeof data.comments[i].comment != "string") {
                        count++;
                        msgObj[`message${count}`] = `${data.comments[i].name}'s comment must be a string`;
                        break;
                    }

                    data.comments[i]["_id"] = uuidv1();


                }
            }

            if (!this.isEmpty(msgObj)) {  //https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty
                // console.log(msgObj);
                return msgObj;
            }
            else {

                const insertInfo = await mongoCollections.insertOne(data);
                if (insertInfo.insertedCount === 0) {
                    count++;
                    msgObj[`message${count}`] = `Could not insert Task`;
                    return msgObj;
                }
                else {
                    const newId = insertInfo.insertedId;
                    // console.log("newId:" + newId);
                    const task = await this.getTask(newId);
                    return task;
                    // return data;
                }

            }


        }


    },

    async getTask(id) {

        try {

            // console.log(typeof id);

            const mongoCollections = await tasks();

            let msgObj = {};

            if (!id) {
                return { message: "Please Provide an ID." };
            }

            if (!typeof id) {
                return { message: "id is not a string" };
            }

            // const mongoCollections = await tasks();

            // console.log(id);
            const form = await mongoCollections.findOne({ _id: id });

            if (form === null) return { message: `There is no such form with the ID "${id}" in database.` };

            return form;

        }
        catch (e) {
            return { message: "Ther is problem reading from database" };
        }

    },

    async addComment(id, comment) {

        try {

            let count = 0;
            const mongoCollection = await tasks();
            // console.log("id"+id);
            debugger;
            // console.log();
            if (!id) {
                count++;
                msgObj[`message${count}`] = "Id is not provided to add comment";
            } else if (typeof id != "string") {
                count++;
                msgObj[`message${count}`] = "Id provided to add comment is not a String"
            }
            // console.log(msgObj);
            
            // console.log("task");
            let task = await this.getTask(id);
            // console.log("task" + task);
            if (task.hasOwnProperty("message")) {
                return { message: `There is no such task with id ${id}` };
            }

            // console.log("task" + task);
            console.log("comment"+comment);

            if (isEmpty(comment) ) {

                // let task = await this.getTask(id);
                console.log("1");
                count++;
                msgObj[`message${count}`] = `Comment Details is not provided to add to task "${task.title}".`;
            }
            else {

                if (!comment.hasOwnProperty("name")) {
                    count++;
                    msgObj[`message${count}`] = "Person's name is not provided.";
                }
                else if (typeof comment.name != "string") {
                    count++;
                    msgObj[`message${count}`] = "Person's name must be a String";
                }

                if (!comment.hasOwnProperty("comment")) {
                    count++;
                    msgObj[`message${count}`] = "Comment is not provided.";
                }
                else if (typeof comment.comment != "string") {
                    count++;
                    msgObj[`message${count}`] = "Comment must be a String";
                }
            }

            if (!this.isEmpty(msgObj)) {  //https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty
                console.log(msgObj);
                return msgObj;
            }
            else {

                let updateData = {
                    _id: uuidv1(),
                    name: comment.name,
                    comment: comment.comment
                };

                let updateCommand = {
                    $addToSet: { comments: updateData }
                };

                const query = {
                    _id: task._id
                };

                let addComment = await mongoCollection.updateone(query, updateCommand);


                if (addComment == null) {
                    return { message: "Could not add comment to task" };
                }


                return await this.getTask(id);

            }



        }
        catch (e) {

        }
    },

    isEmpty(obj) {
        for (var key in obj) {
            console.log(key);
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

}

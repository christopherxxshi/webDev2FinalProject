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
            else if (data.title.length == 0) {
                count++;
                msgObj[`message${count}`] = "Value of title field is empty.";
            }

            if (!data.hasOwnProperty("description")) {
                count++;
                msgObj[`message${count}`] = "Description field is require for creation of task";
            } else if (typeof data.description != "string") {
                count++;
                msgObj[`message${count}`] = "Description field must be a String for creation of task";
            }
            else if (data.description.length == 0) {
                count++;
                msgObj[`message${count}`] = "Value of description field is empty.";
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

            // data["_id"] = uuidv1();
            data["id"] = uuidv1();

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
                    else if (data.comments[i].name.length == 0) {
                        count++;
                        msgObj[`message${count}`] = "Value of Person's name is empty";
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
                    else if (data.comments[i].comment.length == 0) {
                        count++;
                        msgObj[`message${count}`] = `Value of ${data.comments[i].name}'s comment is empty`;
                    }

                    // data.comments[i]["_id"] = uuidv1();
                    data.comments[i]["id"] = uuidv1();


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

            if (typeof id != "string") {
                return { message: "id is not a string" };
            }

            // const mongoCollections = await tasks();

            // console.log(id);
            // const form = await mongoCollections.findOne({ _id: id });
            // console.log(id);
            const task = await mongoCollections.findOne({ id: id });
            // console.log("id"+id);

            if (task === null) return { message: `There is no such task with the ID "${id}" in database.` };

            return task;

        }
        catch (e) {
            return { message: "Ther is problem reading from database" };
        }

    },

    async addComment(id, comment) {

        try {

            var count = 0;
            const mongoCollection = await tasks();
            var msgObj = {};
            // console.log("id"+id);
            // debugger;
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
            var task = await this.getTask(id);
            // console.log("task");
            if (task.hasOwnProperty("message")) {
                return { message: `There is no such task with id ${id}` };
            }

            // console.log("task" + task);
            // console.log("comment"+comment);

            if (this.isEmpty(comment)) {

                // let task = await this.getTask(id);
                // console.log("1"); count++;
                console.log(count);
                msgObj[`message${count}`] = `Comment Details is not provided to add to task '${task.title}'.`;

            }
            else {
                // console.log(comment[0]);
                if (!comment.comments[0].hasOwnProperty("name")) {
                    count++;
                    msgObj[`message${count}`] = "Person's name is not provided.";
                }
                else if (typeof comment.comments[0].name != "string") {
                    count++;
                    msgObj[`message${count}`] = "Person's name must be a String";
                }
                else if (comment.comments[0].name.length == 0) {
                    count++;
                    msgObj[`message${count}`] = "Person's name is empty";
                }

                if (!comment.comments[0].hasOwnProperty("comment")) {
                    count++;
                    msgObj[`message${count}`] = "Comment is not provided.";
                }
                else if (typeof comment.comments[0].comment != "string") {
                    count++;
                    msgObj[`message${count}`] = "Comment must be a String";
                }
                else if (comment.comments[0].comment.length == 0) {
                    count++;
                    msgObj[`message${count}`] = "Comment is empty";
                }
            }
            // console.log("1");
            if (!this.isEmpty(msgObj)) {  //https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty
                console.log(msgObj);
                return msgObj;
            }
            else {

                let updateData = {
                    id: uuidv1(),
                    name: comment.comments[0].name,
                    comment: comment.comments[0].comment
                };

                let updateCommand = {
                    $addToSet: { comments: updateData }
                };

                const query = {
                    id: task.id
                };

                // console.log(updateCommand);
                // console.log(query);

                let addComment = await mongoCollection.updateOne(query, updateCommand);

                // console.log("addComment");
                // console.log(addComment);
                if (addComment == null) {
                    return { message: "Could not add comment to task" };
                }

                task = await this.getTask(id)
                // console.log(task);

                return task;

            }



        }
        catch (e) {

        }
    },

    async removeComment(taskId, commentId) {

        try {

            let msgObj = {}
            let count = 0;

            // console.log("1");

            var mongoCollection = await tasks();

            // console.log("taskId" + taskId);

            // console.log("commentId" + commentId);

            if (!taskId) {
                count++;
                msgObj[`message${count}`] = "Task Id is not provided.";
            }
            else if (typeof taskId != "string") {

                count++;
                msgObj[`message${count}`] = "Task Id must be a String value.";
            }

            if (!commentId) {
                count++;
                msgObj[`message${count}`] = "Comment Id is not provided.";
            }
            else if (typeof commentId != "string") {
                count++;
                msgObj[`message${count}`] = "Comment Id must be a String value.";
            }



            if (!this.isEmpty(msgObj)) {
                return msgObj;
            }
            else {



                let confirmTaskId = await this.getTask(taskId);

                if (!confirmTaskId.hasOwnProperty("message")) {

                    const commentExist = await mongoCollection.findOne(
                        // { "comments._id": commentId },
                        { "comments.id": commentId },
                        // { comments: { $elemMatch: { "_id": { $exists: commentId } } } });
                        { comments: { $elemMatch: { "id": { $exists: commentId } } } });

                    // console.log(this.isEmpty(commentExist));

                    if (commentExist === null) {

                        return { message: `There is no comment with Id  ${commentId}.` }

                    }
                    else {

                        // console.log("commentExist"+JSON.stringify(commentExist) );
                        console.log("commentId" + commentId);

                        // let del = await mongoCollection.findOneAndUpdate({ _id: confirmTaskId._id }, { $pull: { comments: { "_id": commentId } } });
                        let del = await mongoCollection.findOneAndUpdate({ id: confirmTaskId.id }, { $pull: { comments: { "id": commentId } } });

                        if (del == null) return { message: "Could not delete Comment." };
                        // console.log(del);
                        return del;
                    }

                }
                else {
                    return confirmTaskId;
                }
            }

        }
        catch (e) {

        }
    },

    async changeTask(id, data) {

        try {

            var count = 0;
            const mongoCollection = await tasks();
            var msgObj = {};

            if (!id) {
                count++;
                msgObj[`message${count}`] = "Id is not provided to change Task";
            } else if (typeof id != "string") {
                count++;
                msgObj[`message${count}`] = "Id provided to change task is not a String"
            }

            if (this.isEmpty(msgObj)) {

                let confirmTaskId = await this.getTask(id);

                if (!confirmTaskId.hasOwnProperty("message")) {

                    if (!data.hasOwnProperty("title")) {
                        count++;
                        msgObj[`message${count}`] = "Title field is require for changing  task";
                    } else if (typeof data.title != "string") {
                        count++;
                        msgObj[`message${count}`] = "Title field must be a String for changing  task";
                    }
                    else if (data.title.length == 0) {
                        count++;
                        msgObj[`message${count}`] = "Title field is empty";
                    }

                    if (!data.hasOwnProperty("description")) {
                        count++;
                        msgObj[`message${count}`] = "Description field is require for changing  task";
                    } else if (typeof data.description != "string") {
                        count++;
                        msgObj[`message${count}`] = "Description field must be a String for changing  task";
                    }
                    else if (data.description.length == 0) {
                        count++;
                        msgObj[`message${count}`] = "Description field is empty";
                    }

                    if (!data.hasOwnProperty("hoursEstimated")) {
                        count++;
                        msgObj[`message${count}`] = "Hours Estimated field is require for changing  task";
                    } else if (typeof data.hoursEstimated != "number") {
                        count++;
                        msgObj[`message${count}`] = "Hours Estimated field must be a Number not a string for changing  task";
                    }

                    if (!data.hasOwnProperty("completed")) {
                        count++;
                        msgObj[`message${count}`] = "Task Completion field is require for changing of task";
                    }
                    else if (typeof data.completed != "boolean") {
                        count++;
                        msgObj[`message${count}`] = "Task Completion field must be either 'true' or 'false for changing of task";
                    }

                    if (this.isEmpty(msgObj)) {

                        let updateFormData = {};

                        updateFormData.title = data.title;
                        updateFormData.description = data.description;
                        updateFormData.hoursEstimated = data.hoursEstimated;
                        updateFormData.completed = data.completed;

                        let updateCommand = {
                            $set: updateFormData
                        };

                        const query = {
                            id: id
                            // _id: id
                        };


                        let form = await mongoCollection.updateOne(query, updateCommand);

                        if (form == null) {
                            return { message: "Could notUpdate Form" };
                        }

                        // console.log("hi");
                        let task = await this.getTask(id);

                        return task;

                    }
                    else {
                        return msgObj;
                    }

                }
                else {

                    return { message: "Wrong task Id provided." }

                }

            }
            else {
                return msgObj;
            }





        }
        catch (e) {



        }

    },

    async updateTask(id, task) {
        try {

            var count = 0;
            const mongoCollection = await tasks();
            var msgObj = {};

            if (!id) {
                count++;
                msgObj[`message${count}`] = "Id is not provided to change Task";
            } else if (typeof id != "string") {
                count++;
                msgObj[`message${count}`] = "Id provided to change task is not a String";
            }

            if (this.isEmpty(msgObj)) {

                let confirmTaskId = await this.getTask(id);

                if (!confirmTaskId.hasOwnProperty("message")) {

                    let updateTaskData = {};
                    let propCount = 0;
                    let length = 0;

                    for (let prop in task) {

                        // console.log(prop);

                        length++;

                        if (prop == "title") {
                            if (task[prop].length > 0 && typeof task[prop] == "string") {
                                updateTaskData["title"] = task[prop];
                                propCount++;
                            }
                            else {
                                count++;
                                msgObj[`message${count}`] = "Problem in title field.";
                            }

                        }

                        if (prop == "description") {
                            if (task[prop].length > 0 && typeof task[prop] == "string") {
                                updateTaskData["description"] = task[prop];
                                propCount++;
                            }
                            else {
                                count++;
                                msgObj[`message${count}`] = "Problem in description field.";
                            }
                        }

                        if (prop == "hoursEstimated") {
                            if (typeof task[prop] == "number") {
                                updateTaskData["hoursEstimated"] = task[prop];
                                propCount++;
                            }
                            else {
                                count++;
                                msgObj[`message${count}`] = "Problem in hoursEstimated field.";
                            }

                        }

                        if (prop == "completed") {
                            if (typeof task[prop] == "boolean") {
                                updateTaskData["completed"] = task[prop];
                                propCount++;

                            }
                            else {
                                count++;
                                msgObj[`message${count}`] = "Problem in completed field.";
                            }
                        }


                        // console.log("length" + length);
                        // console.log("propCount" + propCount);


                    }


                    if (length == propCount) {

                        let updateCommand = {
                            $set: updateTaskData
                        };

                        const query = {
                            id: id
                            // _id: id
                        };


                        let form = await mongoCollection.updateOne(query, updateCommand);

                        if (form == null) {
                            return { message: "Could notUpdate Form" };
                        }

                        // console.log("hi");
                        let task = await this.getTask(id);

                        return task;


                    }
                    else {
                        return msgObj;
                    }
                }
                else {

                    return { message: "Wrong task Id provided." }
                }

            }
            else {
                return msgObj;
            }

        }
        catch (e) {

        }
    },

    async getAllTask(skip, take) {

        try {

            const mongoCollection = await tasks();

            let skipNumber = parseInt(skip);
            let takeNumber = parseInt(take);

            // console.log(skipNumber);
            // console.log(takeNumber);

            if (!skipNumber) {
                skipNumber = 0;
            }

            if (!takeNumber) {
                console.log(takeNumber);
                takeNumber = 20;
            }

            const tasksData = await mongoCollection.find({}).skip(skipNumber).limit(takeNumber).toArray();
            //https://docs.mongodb.com/manual/reference/method/cursor.skip/
            //https://docs.mongodb.com/manual/reference/method/cursor.limit/


            // const tasksData = await mongoCollection.find({}).toArray();

            return tasksData;
        }
        catch (e) {

        }
    },

    isEmpty(obj) {
        // console.log(obj);
        // console.log("obj");
        for (var key in obj) {
            // console.log(key);
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

}

const mock = require('mockjs');
const Random = mock.Random;
const model = require('./models');
const users = require('./users');


async function createUser(num) {
    for(let i = 0; i < num ; i++){
        let user = {
            username: Random.word(3,10),
            imagePath: undefined,
            language: []
        };
        try{
            let result = await users.addUser(user);
            console.log(result);
        }catch (e) {
            console.log(e);
        }
    }
}
async function test(){
    try{
        let result = await users.updateUserById("3f8ac6c5-89c5-44fb-bb2f-a541ad91962f",{languages: ['Java']});
        console.log(result);
    }catch (e) {
        console.log(e);
    }
}

test();

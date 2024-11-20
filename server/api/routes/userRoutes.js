let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
const auth = require("../middleware/auth");

router.get('/', (req, res) => {
    Controllers.userController.getUsers(res);
})

/* router.get('/', auth, (req, res) => {
    Controllers.userController.getUsers(res);
}) */

router.post('/login', (req, res) => {
    Controllers.userController.loginUser(req, res)
})

router.post('/register', (req, res) => {
    Controllers.userController.registerUser(req, res)
})


router.get('/:id', (req, res) => {
    Controllers.userController.getUserById(req, res)
})

router.post('/create', (req, res) => {
    Controllers.userController.createUser(req.body, res)
})

router.put('/update/:id', (req, res) => {
    Controllers.userController.updateUser(req, res)
})

router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id)
    Controllers.userController.deleteUser(req, res)
})

module.exports = router;

//TEST

//GET
//http://127.0.0.1:8000/api/users/ 
//retrive list of all users
//http://127.0.0.1:8000/api/users/1
//get user 1 info

//POST
// http://127.0.0.1:8000/api/users/create
/*   
{
    "id":"11",
    "email":"mwz@gmail.com",
    "username":"macmwz",
    "password":"1234",
    "name":{
        "firstname":"Marco",
        "lastname":"Wells"
        },
    "address":{
    "city":"Auckland",
    "street":"street ave",
    "number": "123",
    "zipcode":"1234",
    "geolocation":{
        "lat":"12.23.43",
        "long":"1.2.3.4"
        }
    },
    "phone":"09 123 4567"
} 
*/
//PUT
//http://127.0.0.1:8000/api/users/update/11
/* 
{
    "id":"11",
    "email":"CHANGED@gmail.com",
    "username":"macmwz",
    "password":"1234567",
    "name":{
        "firstname":"Marco",
        "lastname":"Wells"
        },
    "address":{
    "city":"Auckland",
    "street":"street ave",
    "number": "123",
    "zipcode":"1234",
    "geolocation":{
        "lat":"12.23.43",
        "long":"1.2.3.4"
        }
    },
    "phone":"09 123 4567"
} 

   */

//DELETE

// http://127.0.0.1:8000/api/users/delete/11

//WORKING AFTER TESTING

//http://127.0.0.1:8000/api/users/register

/* 
{
    "email": "mwzzzzz@gmail.com",
    "password": "12345",
    "firstName": "Marcos",
    "lastName": "Wellss"
}
*/
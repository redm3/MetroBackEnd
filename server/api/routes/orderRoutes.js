let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js

// Get all orders
router.get('/', (req, res) => {
  Controllers.orderController.getAllOrders(req, res);
})


// Get orders by user ID
router.get('/:id', (req, res) => {
  Controllers.orderController.getOrdersByUserID(req, res);
})

// Create a new order
router.post('/create', (req, res) => {
  Controllers.orderController.createOrder(req, res)
})

router.delete('/delete/:id', (req, res) => {
  Controllers.orderController.deleteOrder(req, res)
})


module.exports = router;

//TEST
//GET

//http://localhost:8000/api/orders

//http://localhost:8000/api/orders/64362fade8d168035a4cb92f

//POST

//http://127.0.0.1:8000/api/orders/create

/*
{
  "id": 1,
  "userId": "64362039ff6373d8692cc6f7",
  "date": "2023-04-12T12:34:56.789Z",
  "products": [
    {
      "productId": "64376f90ab8111f192d252cf",
      "quantity": 2
    },
    {
      "productId": "64376f90ab8111f192d252d0",
      "quantity": 1
    }
  ]
}

{
  "_id": "64362039ff6373d8692cc6f8",
  "userId": "64362039ff6373d8692cc6f7",
  "date": "2023-04-12T12:34:56.789Z",
  "products": [
    {
      "productId": "64376f90ab8111f192d252cf",
      "quantity": 2
    },
    {
      "productId": "64376f90ab8111f192d252d0",
      "quantity": 1
    }
  ]
}

{
  "_id": "NEW USER ID",
  "userId": "6437ac1012827d41e7a3e018",
  "date": "2023-04-12T12:34:56.789Z",
  "products": [
    {
      "productId": "64376f90ab8111f192d252cf",
      "quantity": 2
    },
    {
      "productId": "64376f90ab8111f192d252d0",
      "quantity": 1
    }
  ]
}

 */


//delete
//http://localhost:8000/api/orders/delete/
//Problems with this one


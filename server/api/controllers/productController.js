const axios = require('axios');
let Models = require("../models"); //matches index.js
const mongoose = require('mongoose');

/* const getProducts = () => {
    Models.Product.deleteMany({}).then(()=> {
    axios.get('https://fakestoreapi.com/products')
        .then(response => {
            // save the retrieved Product data to your database
            Models.Product.insertMany(response.data)
                .then(() => {
                    // retrieve the saved Product data from your database
                    Models.Product.find({})
                        .then(data => console.log({ result: 200, data: data }))
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        })
    })
}; */

const getProducts = (req, res) => {
    Models.Product.find({})
        .then(data => {

            res.send({ result: 200, data: data });
        })
        .catch(err => {
            res.send({ result: 404, error: err.message })
        });
};

const getProduct = (req, res) => {
    /* axios.get('https://fakestoreapi.com/products/' + req.params.id) */
    Models.Product.findOne({ id: req.params.id })
        .then(data => {
            if (!data) {
                res.send({ result: 404, error: "User not found" })
            } else {
                res.send({ result: 200, data: data })
            }
        })
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        });
};


const createProduct = (data, res) => {
    //creates a new Product using JSON data POSTed in request body
    console.log(data)
    new Models.Product(data).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const updateProduct = (req, res) => {
    //updates the user matching the ID from the param using JSON data POSTed in request body
    console.log(req.body)
    /* Models.User.findOne({ id: req.params.id }) */
    Models.Product.findOneAndUpdate({ id: req.params.id }, req.body )
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const deleteProduct = (req, res) => {
    //deletes the user matching the ID from the param
    console.log()
    Models.Product.findOneAndDelete({ id: req.params.id }, req.body )
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

module.exports = {
    getProduct, getProducts, createProduct, updateProduct, deleteProduct
}
const express = require('express');
const app = express();
const fs = require('fs');
const dataProducts = JSON.parse(fs.readFileSync('./database/listado.json', 'utf-8'));

const productController = {
    main: function(req, res, next) {
        res.redirect('/products/list');
    },
    create: function(req, res, next) {
        res.render('addProductFrom', { dataProducts })
    },
    store: function(req, res, next) {
        dataProducts.push(req.body);
        let dataProductsJSON = JSON.stringify(dataProducts);
        fs.writeFileSync(__dirname + "/../database/listado.json", dataProductsJSON);
        res.send("Producto Creado")
    },
    edit: function(req, res, next) {
        var idProduct = req.params.id;
        var idFound;
        for (var i = 0; i < dataProducts.length; i++) {
            if (dataProducts[i].id == idProduct) {
                idFound = dataProducts[i];
                break;
            }
        }
        if (idFound) {
            res.render("editProductFrom", { idFound })
        } else {
            res.send("Producto no encontrado");
        }
    },
    update: function(req, res, next) {
        var idProduct = req.params.id;
        var editProducts = dataProducts.map(function(product) {
            if (product.id == idProduct) {
                let editProduct = req.body;
                editProduct.id = idProduct;
                return editProduct;
            }
            return user;
        });
        editProductsJSON = JSON.stringify(editProducts);
        fs.writeFileSync(__dirname + "/../database/listado.json", editProductsJSON);
        res.redirect("/products/edit/" + idProduct);
    },
    delete: function(req, res, next) {
        var idProduct = req.params.id;
        var idFound;
        for (var i = 0; i < dataProducts.length; i++) {
            if (dataProducts[i].id == idProduct) {
                idFound = dataProducts[i];
                break;
            }
        }
        if (idFound) {
            var productDestroy = dataProducts.filter(function(product) {
                return product.id != idProduct;
            });
            productDestroyJSON = JSON.stringify(productDestroy);
            fs.writeFileSync(__dirname + "/../database/listado.json", productDestroyJSON);
            res.send("Producto eliminado")
        } else {
            res.send("Producto no encontrado");
        }
    },
    list: function(req, res, next) {
        res.render("list", { dataProducts });
    }
}

module.exports = (productController)
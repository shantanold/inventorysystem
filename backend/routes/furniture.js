const express  = require('express')
const Item = require('../models/itemModel')
const router= express.Router()
const {
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem,
    getItemsDescriptionSorted,
    getItemsDurationSorted,
    getItemsRoomSorted,
    getItemsLocationSorted
    } = require('../controllers/itemController')

router.get('/',getItems)

router.get('/item/:id',getItem)

router.post('/',createItem)

router.delete('/item/:id',deleteItem)

router.patch('/item/:id',updateItem)

router.get('/desc',getItemsDescriptionSorted)

router.get('/duration',getItemsDurationSorted)

router.get('/room',getItemsRoomSorted)

router.get('/location',getItemsLocationSorted)


module.exports = router
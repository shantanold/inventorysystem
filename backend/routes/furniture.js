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

router.get('/:id',getItem)

router.post('/',createItem)

router.delete('/:id',deleteItem)

router.patch('/:id',updateItem)

router.get('/desc',getItemsDescriptionSorted)

router.get('/duration',getItemsDurationSorted)

router.get('/room',getItemsRoomSorted)

router.get('/location',getItemsLocationSorted)


module.exports = router
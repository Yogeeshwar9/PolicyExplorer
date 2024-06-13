const express = require('express')
const router = express.Router()
const controller = require('../controller/controller.js')


router.post('/adminLogin',controller.adminLogin)
router.get('/logout',controller.logout)
router.post('/userlogin',controller.userlogin)
router.post('/policy',controller.policy)
router.post('/userdata',controller.userdata)
router.get('/userPolicies',controller.userPolicies)
router.get('/policy',controller.adminPolicy)
router.delete('/policy/:id',controller.deletePolicy)
router.get('/policy/:id',controller.policyById)
router.put('/policy/:id',controller.putById)
router.get('/userdetails',controller.userDetails)

module.exports ={Router:router}

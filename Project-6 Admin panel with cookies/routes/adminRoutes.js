    const express=require("express")
    const routes=express.Router();

    const adminCtr = require('../controllers/adminCtr')
    const adminModel = require('../model/adminModel')

    routes.get('/',adminCtr.admin);
    routes.get('/formAdd',adminCtr.addForm);
    routes.get('/viewPage',adminCtr.viewForm);
    routes.post('/addAdmin',adminModel.adminUpload,adminCtr.insertAdmin);
    routes.get('/deleteAdmin/:adminId',adminCtr.deleteAdmin);
    routes.get('/editAdmin/:adminId',adminCtr.editAdmin);
    routes.post('/editAdminData/:adminId',adminModel.adminUpload,adminCtr.editAdminData);
    routes.post('/singleAdmin/:id',adminCtr.singleAdmin);

    module.exports=routes;
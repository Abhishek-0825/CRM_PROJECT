const express = require('express');
const router = express.Router();
const controller = require('../controllers/transportController');

router.post('/createpartner', controller.createPartner);
router.get('/getallpartner', controller.getAllPartners);
router.get('/getpartnerBy/:id', controller.getPartnerById);
router.put('/updatepartnerBy/:id', controller.updatePartner);
router.delete('/deletepartnerBy/:id', controller.deletePartner);

module.exports = router;

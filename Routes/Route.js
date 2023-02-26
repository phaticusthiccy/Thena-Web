const express = require("express")
const router = express.Router();
const accountRoutes = require('./pages.js')

router.use(accountRoutes)
module.exports = router;
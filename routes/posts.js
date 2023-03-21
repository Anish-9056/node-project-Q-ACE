const router = require('express').Router();
const verify = require('./verfiyToken')
router.get('/',verify,(req, res) => {
  res.json({
      posts:{
          tittle:'post data',
          Description:'post description',
      }
  })
})
module.exports = router
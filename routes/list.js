const router = require('express').Router();
const isAuthenticated = require('../middlewares/isauth');
const { postList,getFilterSetByUser,updateFilterSet,removeFilterSet} = require('../controllers/list');

router.post('/create',isAuthenticated,postList)

router.get('/:userId',isAuthenticated,getFilterSetByUser);
router.put('/:listId',isAuthenticated,updateFilterSet);
router.delete('/:listId',isAuthenticated,removeFilterSet);

module.exports = router;
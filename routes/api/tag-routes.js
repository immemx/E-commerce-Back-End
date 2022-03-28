const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      module: Product,
      attributes: ['id', 'product_name', 'price', 'stock'],
      through: { ProductTag, attributes: [] },
      as: 'products'
    }
  })
  .then(dbResult => res.json(dbResult))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock'],
      through: { ProductTag, attributes: [] },
      as: 'products'
    }]
  })
  .then(dbResult => {
    if(!dbResult){
      res.status(404).json({ message: 'ID not found in database'});
      return;
    }
    res.json(dbResult)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(dbResult => res.json(dbResult))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
  .then(dbResult => {
    if(!dbResult) {
      res.status(404).json({ message: 'ID was not found in database' });
      return;
    }
    res.json(dbResult);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbResult => {
    if(!dbResult) {
      res.status(404).json({ message: 'ID not found in database '});
      return;
    }
    res.json(dbResult);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

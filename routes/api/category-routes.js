const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
      model: Product,
      attributes: { exclude: ['category_id']}
    }
  ]
  })
  .then(dbReturn => res.json(dbReturn))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        attributes: { exclude: ['category_id']}
      }
    ]
  })
  .then(dbReturn => {
    if(!dbReturn) {
      res.status(404).json({ message: 'ID not found in database' });
      return;
    }
    res.json(dbReturn)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(dbReturn => res.json(dbReturn))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: res.params.id }
  }) 
  .then(dbReturn => {
    if(!dbReturn) {
      res.status(404).json({ message: 'ID not found in database'});
      return;
    }
    res.json(dbReturn);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbReturn => {
    if(!dbReturn) {
      res.status(404).json({ message: 'ID not found in database '});
      return;
    }
    res.json(dbReturn)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

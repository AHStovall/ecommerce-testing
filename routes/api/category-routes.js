const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const indivCategoriesData = Category.findAll({
      include: [{model: Product}]
    });
  if (!indivCategoriesData) {
    res.status(404).json({message: 'No category found'});
    return;
  } 
  res.status(200).json(indivCategoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => {res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body)
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const indivCategoryData = Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!indivCategoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(indivCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

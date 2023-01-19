const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const indivTagsData = Category.findAll({
      include: [{model: Product}]
    });
  if (!indivTagsData) {
    res.status(404).json({message: 'No tag found'});
    return;
  } 
  res.status(200).json(indivTagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => {res.status(200).json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body)
  .then((tag) => {res.status(200).json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const indivTagData = Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!indivTagData) {
      res.status(404).json({ message: 'No tags found with that id!' });
      return;
    }

    res.status(200).json(indivTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

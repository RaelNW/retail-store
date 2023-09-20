const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    // Send the categories as a JSON response
    res.status(200).json(categories);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({ error: "Oh, oh, something's up!" });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const categories = await categories.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    if (!categories) {
      return res.status(404).json({ error: "Category not found" });
    }
    // Send the categories as a JSON response
    res.status(200).json(categories);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({ error: "Oh, oh, something's up!" });
  }
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;

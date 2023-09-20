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
    if (categories.length === 0) {
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

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    // Send the category as a JSON response
    res.status(200).json(category);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({ error: "Oh, oh, something's up!" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Create a new category with the data from the request body
    const newCategory = await Category.create(req.body);

    // Send the newly created category as a JSON response
    res.status(201).json(newCategory);
  } catch (error) {
    // Handle any errors that occur during category creation
    console.error(error);
    res.status(500).json({ error: "Oh, oh, something's up!" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Find the category to update by its id
    const category = await Category.findByPk(req.params.id);

    // If the category is not found, return a 404 error
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Update the category with the data from the request body
    await category.update(req.body);

    // Send the updated category as a JSON response
    res.status(200).json(category);
  } catch (error) {
    // Handle any errors that occur during category update
    console.error(error);
    res.status(500).json({ error: "Oh, oh, something's up!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find the category to delete by its id
    const category = await Category.findByPk(req.params.id);

    // If the category is not found, return a 404 error
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Delete the category
    await category.destroy();

    // Send a success message as a JSON response
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during category deletion
    console.error(error);
    res.status(500).json({ error: "Oh, oh, something's up!" });
  }
});

module.exports = router;

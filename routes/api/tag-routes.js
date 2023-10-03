const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    // Send the tag as a JSON response
    res.status(200).json(tagData);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({ error: "Oh, oh, something's up!" });
  }
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }
    // Send the tag as a JSON response
    res.status(200).json(tagData);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({ error: "Oh, oh, something's up!" });
  }
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  try {
    // Extract tag data from the request body
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
    // Validate the input (ensure tag_name exists and meets your criteria)
  } catch (error) {
    return res.status(400).json({ error: "Tag creation failed" });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // Validate the input (ensure tag_name exists and meets your criteria)
    if (tagUpdate[0] === 0) {
      return res.status(400).json({ error: "No tag found " });
    } else {
      res.status(200).json(tagUpdate);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!tagData) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }
    // Send the product as a JSON response
    res.status(200).json({ message: "Tag deleted" });
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({ error: "Oh, oh, something's up!" });
  }
});

module.exports = router;

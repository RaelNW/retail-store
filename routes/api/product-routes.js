const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  // find all products
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
        },
      ],
    });
    // Send the product as a JSON response
    res.status(200).json(productData);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({ error: "Oh, oh, something's up!" });
  }
});

// get one product
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
        },
      ],
    });
    if (!productData) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    // Send the product as a JSON response
    res.status(200).json(productData);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({ error: "Oh, oh, something's up!" });
  }
});

// create new product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((newProduct) => {
      // Check if there are any product tags in the request body
      if (req.body.tagIds.length) {
        // Create product-tag associations for each tag ID
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: newProduct.id,
            tag_id,
          };
        });

        // Bulk create the product-tag associations in the ProductTag model
        return ProductTag.bulkCreate(productTagIdArr);
      }

      // Respond with a 200 status code (Created) and send the newly created product as JSON
      res.status(200).json(newProduct);
    })
    .catch((error) => {
      // Handle any errors that occur during the database operation
      console.error(error);

      // Respond with a 500 status code (Internal Server Error) and a custom error message
      res.status(400).json({ error: "Oh, oh, something's up!" });
    });
});

/* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!productData) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    // Send the product as a JSON response
    res.status(200).json(productData);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({ error: "Oh, oh, something's up!" });
  }
});

module.exports = router;

package handlers

import (
	"backend/database"
	"backend/model"
	"backend/utils"
	"errors"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	guuid "github.com/google/uuid"
	"gorm.io/gorm"
)

type UpdateProductRequest struct {
	Name     *string  `json:"name" validate:"omitempty,min=3,max=100"`
	Category *string  `json:"category" validate:"omitempty"`
	Amount   *float64 `json:"amount" validate:"omitempty,gte=0"`
	Image    *string  `json:"image" validate:"omitempty,min=5"`
	Price    *float64 `json:"price" validate:"omitempty,gte=0"`
}

func GetAllProducts(c *fiber.Ctx) error {
	Products := []model.Product{}

	respons, err := utils.Paginate(database.DB, c, map[string]interface{}{}, &Products)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  500,
			"success": false,
			"message": "Failed to retrieve products",
		})
	}

	return c.Status(fiber.StatusOK).JSON(respons)
}

func GetProductById(c *fiber.Ctx) error {
	db := database.DB
	id, err := guuid.Parse(c.Params("id"))

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  400,
			"success": false,
			"message": "Invalid UUID Format",
		})
	}

	Product := new(model.Product)
	err = db.Where("id = ?", id).First(Product).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status":  404,
				"success": false,
				"message": "Product not found",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  500,
			"success": false,
			"message": "Internal Server Error",
		})
	}

	return c.JSON(fiber.Map{
		"status":  200,
		"success": true,
		"message": "success",
		"data":    Product,
	})
}

func CreateProduct(c *fiber.Ctx) error {
	product := new(model.Product)

	if err := c.BodyParser(product); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  400,
			"success": false,
			"message": "Invalid request format",
		})
	}

	validate := validator.New()
	if err := validate.Struct(product); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":  422,
			"success": false,
			"message": "Validation error",
			"errors":  err.Error(),
		})
	}

	product.ID = guuid.New()

	DB := database.DB

	product.SearchVector = utils.GenerateTSVector(product.Name, product.Category)

	err := DB.Create(&product).Error
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  500,
			"success": false,
			"message": "Could not create product",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status":  201,
		"success": true,
		"message": "Product created successfully",
		"data":    product,
	})
}

func UpdateProduct(c *fiber.Ctx) error {
	id, err := guuid.Parse(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  400,
			"success": false,
			"message": "Invalid UUID format for Product ID",
		})
	}

	var body UpdateProductRequest
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  400,
			"success": false,
			"message": "Invalid request body",
		})
	}

	if err := validator.New().Struct(body); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":  422,
			"success": false,
			"message": err.Error(),
		})
	}

	var product model.Product
	db := database.DB

	if err := db.First(&product, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status":  404,
				"success": false,
				"message": "Product not found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  500,
			"success": false,
			"message": "Internal Server Error",
		})
	}

	if body.Name != nil {
		product.Name = *body.Name
	}
	if body.Category != nil {
		product.Category = *body.Category
	}
	if body.Price != nil {
		product.Price = *body.Price
	}
	if body.Amount != nil {
		product.Amount = *body.Amount
	}
	if body.Image != nil {
		product.Image = *body.Image
	}

	product.SearchVector = utils.GenerateTSVector(product.Name, product.Category)

	if err := db.Save(&product).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  500,
			"success": false,
			"message": "Failed to update product",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  200,
		"success": true,
		"message": "Product updated successfully",
		"data":    product,
	})
}

func DeleteProduct(c *fiber.Ctx) error {
	id, err := guuid.Parse(c.Params("id"))

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  400,
			"success": false,
			"message": "Invalid ID format",
		})
	}

	db := database.DB
	err = db.Where("id = ?", id).Delete(&model.Product{}).Error

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  500,
			"success": false,
			"message": "Failed to delete Product",
		})
	}

	return c.JSON(fiber.Map{
		"status":  200,
		"success": true,
		"message": "Product was removed",
	})
}

func SearchProducts(c *fiber.Ctx) error {
	query := c.Query("q")
	if query == "" {
		return c.JSON(fiber.Map{
			"status":  400,
			"success": false,
			"message": "Query parameter 'q' is required",
		})
	}

	var products []model.Product
	err := database.DB.Raw(`
		SELECT * FROM products
		WHERE search_vector @@ to_tsquery('english', ?)
	`, query).Scan(&products).Error

	if err != nil {
		return c.JSON(fiber.Map{
			"status":  500,
			"success": false,
			"message": "Error while searching products",
		})
	}

	return c.JSON(fiber.Map{
		"status":  200,
		"success": true,
		"data":    products,
	})
}

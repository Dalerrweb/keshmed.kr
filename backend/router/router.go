package router

import (
	"backend/handlers"
	"backend/middleware"

	"github.com/gofiber/fiber/v2"
)

func Initalize(router *fiber.App) {
	router.Get("/api", func(c *fiber.Ctx) error {
		return c.Status(200).SendString("Hello to the crm world!")
	})

	router.Post("/api/login", handlers.Login)
	router.Post("/api/users", handlers.CreateUser)

	productsRead := router.Group("/api/products")
	productsRead.Get("/", handlers.GetAllProducts)
	productsRead.Get("/", handlers.SearchProducts)
	productsRead.Get("/:id", handlers.GetProductById)

	products := router.Group("/api/products", middleware.ProtectRoute())
	products.Post("/", handlers.CreateProduct)
	products.Patch("/:id", handlers.UpdateProduct)
	products.Delete("/:id", handlers.DeleteProduct)

	upload := router.Group("/api/upload", middleware.ProtectRoute())
	upload.Post("/", handlers.UploadImage)
}

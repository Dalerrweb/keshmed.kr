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

	products := router.Group("/api/products", middleware.ProtectRoute())
	products.Get("/", handlers.GetAllProducts)
	products.Get("/", handlers.SearchProducts)
	products.Post("/", handlers.CreateProduct)
	products.Patch("/:id", handlers.UpdateProduct)
	products.Get("/:id", handlers.GetProductById)
	products.Delete("/:id", handlers.DeleteProduct)
}

package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	// Пример маршрута
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, Fiber!")
	})

	// Запуск сервера
	log.Fatal(app.Listen(":3000"))
}

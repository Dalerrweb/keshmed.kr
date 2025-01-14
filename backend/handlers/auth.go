package handlers

import (
	"backend/database"
	"backend/model"
	"backend/utils"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	guuid "github.com/google/uuid"
	"gorm.io/gorm"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Login(c *fiber.Ctx) error {
	db := database.DB
	json := new(LoginRequest)

	if err := c.BodyParser(json); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":  400,
			"message": "Invalid JSON",
			"success": false,
		})
	}

	found := model.User{}

	query := model.User{Username: json.Username}
	err := db.First(&found, &query).Error
	if err == gorm.ErrRecordNotFound {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  404,
			"success": false,
			"message": "Username not found",
		})
	}
	if !utils.ComparePasswords(found.Password, []byte(json.Password)) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  400,
			"success": false,
			"message": "Invalid Password",
		})
	}

	tokenString, err := utils.GenerateJWT(found)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  500,
			"success": false,
			"message": "Could not generate token",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  200,
		"message": "success",
		"success": true,
		"token":   tokenString,
	})
}

func CreateUser(c *fiber.Ctx) error {
	type CreateUserRequest struct {
		Username string `json:"username" validate:"required,min=3,max=50"`
		Password string `json:"password" validate:"required,min=4,max=100"`
	}

	db := database.DB
	json := new(CreateUserRequest)

	if err := c.BodyParser(json); err != nil {
		return c.JSON(fiber.Map{
			"status":  400,
			"message": "Invalid JSON",
			"success": false,
		})
	}

	validate := validator.New()
	err := validate.Struct(json)
	if err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":  400,
			"message": err.Error(),
			"success": false,
		})
	}

	user := model.User{
		Username: json.Username,
		Password: utils.HashAndSalt([]byte(json.Password)),
		ID:       guuid.New(),
	}

	err = db.Create(&user).Error

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":   500,
			"succeess": false,
			"message":  "Failed to create user",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"status":  200,
		"message": "User created successfully",
		"data":    user,
	})
}

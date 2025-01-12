package middleware

import (
	"backend/auth"
	"errors"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

var jwtSecretKey = []byte(os.Getenv("jwt_secret"))

func ProtectRoute() fiber.Handler {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
				"status":  401,
				"message": "Unauthorized",
			})
		}

		headerParts := strings.Split(authHeader, " ")
		if len(headerParts) != 2 || headerParts[0] != "Bearer" {
			return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
				"status":  401,
				"message": "Invalid Authorization header format",
			})
		}

		tokenString := headerParts[1]
		if len(tokenString) > 1024 {
			return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
				"status":  401,
				"message": "Token too large",
			})
		}

		claims := &auth.Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, errors.New("unexpected signing method")
			}
			return jwtSecretKey, nil
		})

		if err != nil || !token.Valid || claims.ExpiresAt < time.Now().Unix() {
			return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
				"status":  401,
				"message": "Unauthorized",
			})
		}

		c.Locals("user", claims)
		return c.Next()
	}
}

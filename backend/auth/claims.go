package auth

import (
	"github.com/dgrijalva/jwt-go"
	guuid "github.com/google/uuid"
)

type Claims struct {
	ID       guuid.UUID `json:"id"`
	Username string     `json:"username"`
	jwt.StandardClaims
}

package utils

import (
	"backend/auth"
	"backend/model"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

var jwtSecretKey = []byte(os.Getenv("jwt_secret"))

func GenerateJWT(user model.User) (string, error) {

	claims := &auth.Claims{
		ID:       user.ID,
		Username: user.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecretKey)
}

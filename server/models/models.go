package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"

	"net/http"
)

type User struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Firstname string             `json:"firstname,omitempty" bson:"firstname,omitempty"`
	Lastname  string             `json:"lastname,omitempty" bson:"lastname,omitempty"`
}

func Headers(response http.ResponseWriter) {
	response.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	response.Header().Set("Access-Control-Allow-Methods", "POST")
	response.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	response.Header().Add("content-type", "application/json")
	response.Header().Add("Access-Control-Allow-Origin", "http://localhost:3000")
}

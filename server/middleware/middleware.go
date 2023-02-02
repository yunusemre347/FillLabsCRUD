package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"server/models"

	"github.com/gorilla/mux"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)
var client *mongo.Client
var cursor *mongo.Cursor
var err error

var dbName = "usersreact"
var collectionName = "userlist"


func Helloworld(){
	fmt.Println("hello world")
}
// post endpoint create
func CreateUserEndpoint(response http.ResponseWriter, request *http.Request) {

	// response.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	// response.Header().Set("Access-Control-Allow-Methods", "POST")
	// response.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	// response.Header().Add("content-type", "application/json")
	// response.Header().Add("Access-Control-Allow-Origin", "http://localhost:3000")
	models.Headers(response,"POST")

	var user models.User
	json.NewDecoder(request.Body).Decode(&user)
	collection := client.Database(dbName).Collection(collectionName)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, _ := collection.InsertOne(ctx, user)
	json.NewEncoder(response).Encode(result)
}

// get docs from collection
func GetUsersEndpoint(response http.ResponseWriter, request *http.Request) {
	// response.Header().Add("content-type", "application/json")
	// response.Header().Add("Access-Control-Allow-Origin", "http://localhost:3000")
	models.Headers(response,"GET")

	var users []models.User
	collection := client.Database(dbName).Collection(collectionName)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cursor, err = collection.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var user models.User
		cursor.Decode(&user)
		users = append(users, user)
	}
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(response).Encode(users)
}

// get single doc from collection
func GetSingleUserEndpoint(response http.ResponseWriter, request *http.Request) {

	// response.Header().Add("content-type", "application/json")
	// response.Header().Add("Access-Control-Allow-Origin", "http://localhost:3000")
	models.Headers(response,"GET")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var user models.User
	collection := client.Database(dbName).Collection(collectionName)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err := collection.FindOne(ctx, models.User{ID: id}).Decode(&user)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(response).Encode(user)
}

// update endpoint (update a doc)
func UpdateUserEndpoint(response http.ResponseWriter, request *http.Request) {
	// response.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	// response.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	// response.Header().Add("content-type", "application/json")
	// response.Header().Add("Access-Control-Allow-Origin", "http://localhost:3000")
	// response.Header().Set("Access-Control-Allow-Methods", "PUT")
	models.Headers(response,"PUT")

	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var user models.User
	json.NewDecoder(request.Body).Decode(&user)
	user.ID = id
	collection := client.Database(dbName).Collection(collectionName)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := collection.ReplaceOne(ctx, bson.M{"_id": id}, user)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}

	json.NewEncoder(response).Encode(result)
}

// delete a doc
func DeleteUserEndpoint(response http.ResponseWriter, request *http.Request) {
	// response.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	// response.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	// response.Header().Set("Access-Control-Allow-Methods", "DELETE")
	// response.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	models.Headers(response,"DELETE")
	//////////////
	params := mux.Vars(request)
	fmt.Println(params["id"])
	collection := client.Database(dbName).Collection(collectionName)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second) //cancel if it takes too long
	defer cancel()
	/////////////
	id, _ := primitive.ObjectIDFromHex(params["id"])       //convert hexadecimal to mongodb objectID
	d, err := collection.DeleteOne(ctx, bson.M{"_id": id}) //DeleteOne mongodb function
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Deleted Document", d.DeletedCount)
	json.NewEncoder(response).Encode(params["id"])
}
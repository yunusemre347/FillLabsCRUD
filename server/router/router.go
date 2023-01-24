package router

import (
	"server/middleware"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	//routers
	router.HandleFunc("/create", middleware.CreateUserEndpoint).Methods("POST", "OPTIONS")
	router.HandleFunc("/getAll", middleware.GetUsersEndpoint).Methods("GET", "OPTIONS")
	router.HandleFunc("/get/{id}", middleware.GetSingleUserEndpoint).Methods("GET", "OPTIONS")
	router.HandleFunc("/update/{id}", middleware.UpdateUserEndpoint).Methods("PUT", "OPTIONS")
	router.HandleFunc("/delete/{id}", middleware.DeleteUserEndpoint).Methods("DELETE", "OPTIONS")

	// http.ListenAndServe(":12345", router)

	//cors
	return router
}

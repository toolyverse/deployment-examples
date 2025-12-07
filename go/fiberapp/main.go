package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

type Todo struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

var todos = []Todo{
	{ID: 1, Title: "Learn Fiber", Completed: true},
	{ID: 2, Title: "Build an API", Completed: false},
}

func main() {
	app := fiber.New()

	// Middleware
	app.Use(logger.New())
	app.Use(recover.New())

	// Routes
	app.Get("/", hello)
	app.Get("/health", healthCheck)

	// API Group
	api := app.Group("/api")
	api.Get("/todos", getTodos)
	api.Get("/todos/:id", getTodo)
	api.Post("/todos", createTodo)

	log.Fatal(app.Listen(":3000"))
}

func hello(c *fiber.Ctx) error {
	return c.SendString("Hello, World 👋! Try /api/todos")
}

func healthCheck(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status": "ok",
		"app":    "fiber-demo",
	})
}

func getTodos(c *fiber.Ctx) error {
	return c.JSON(todos)
}

func getTodo(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(400).SendString("Invalid ID")
	}

	for _, todo := range todos {
		if todo.ID == id {
			return c.JSON(todo)
		}
	}
	return c.Status(404).SendString("Todo not found")
}

func createTodo(c *fiber.Ctx) error {
	type Request struct {
		Title string `json:"title"`
	}
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).SendString(err.Error())
	}

	newTodo := Todo{
		ID:        len(todos) + 1,
		Title:     req.Title,
		Completed: false,
	}
	todos = append(todos, newTodo)

	return c.Status(201).JSON(newTodo)
}

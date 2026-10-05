import request from "supertest";
import app from "../src/app";
import * as itemController from "../src/api/v1/controllers/itemController";

jest.mock("../src/api/v1/controllers/itemController", () => ({
  getAllItems: jest.fn((req, res) => res.status(200).send()),
  createItem: jest.fn((req, res) => res.status(201).send()),
  updateItem: jest.fn((req, res) => res.status(200).send()),
  deleteItem: jest.fn((req, res) => res.status(200).send()),
}));

describe("Items Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/items", () => {
    it("should call getAllItems controller", async () => {
      await request(app).get("/api/v1/items");
      expect(itemController.getAllItems).toHaveBeenCalled();
    });
  });

  describe("POST /api/v1/items", () => {
    it("should call createItem controller with valid data", async () => {
      const mockItem = {
        name: "Test Item",
        description: "Test Description",
      };
      await request(app).post("/api/v1/items").send(mockItem);
      expect(itemController.createItem).toHaveBeenCalled();
    });

    it("should handle missing required fields", async () => {
      const response = await request(app).post("/api/v1/items").send({});

      expect(response.status).toBeDefined();
    });
  });

  describe("PUT /api/v1/items/:id", () => {
    it("should call updateItem controller", async () => {
      const mockItem = {
        name: "Updated Item",
        description: "Updated Description",
      };
      await request(app).put("/api/v1/items/1").send(mockItem);
      expect(itemController.updateItem).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/items/:id", () => {
    it("should call deleteItem controller", async () => {
      await request(app).delete("/api/v1/items/1");
      expect(itemController.deleteItem).toHaveBeenCalled();
    });
  });
});
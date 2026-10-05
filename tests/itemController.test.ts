import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as itemController from "../src/api/v1/controllers/itemController";
import * as itemService from "../src/api/v1/services/itemService";

jest.mock("../src/api/v1/services/itemService");

describe("Item Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe("getAllItems", () => {
    it("should handle successful operation", async () => {
      const mockItems = [
        { id: "1", name: "Test Item", description: "Test Description" },
      ];
      (itemService.getAllItems as jest.Mock).mockReturnValue(mockItems);

      await itemController.getAllItems(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Items retrieved successfully",
        data: mockItems,
      });
    });
  });

  describe("createItem", () => {
    it("should handle successful creation", async () => {
      const mockItem = {
        name: "Test Item",
        description: "Test Description",
      };
      const createdItem = {
        id: "1",
        ...mockItem,
      };

      mockReq.body = mockItem;
      (itemService.createItem as jest.Mock).mockReturnValue(createdItem);

      await itemController.createItem(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Item created successfully",
        data: createdItem,
      });
    });

    it("should return 400 when name is missing", async () => {
      mockReq.body = { description: "Test Description" };

      await itemController.createItem(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Item name is required",
      });
    });
  });
});
import { describe, it, expect, vi } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from "../services/dogService";

describe("Dog Controller", () => {

  it("returns JSON with success true and image data", async () => {

    const mockServiceResponse = {
      imageUrl:
        "https://images.dog.ceo/breeds/poodle-miniature/n02113712_171.jpg",
      status: "success",
    };

    // Mock service layer
    vi.spyOn(dogService, "getRandomDogImage")
      .mockResolvedValue(mockServiceResponse);

    // Create mock request and response objects
    const req = {} as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    // Call controller
    await getDogImage(req, res);

    // Assertions
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockServiceResponse,
    });

  });

});
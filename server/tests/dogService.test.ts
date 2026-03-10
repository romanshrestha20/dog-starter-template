import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getRandomDogImage } from "../services/dogService";

describe("Dog Service", () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return a random dog image", async () => {

    const mockResponse = {
      message:
        "https://images.dog.ceo/breeds/terrier-border/n02093754_3651.jpg",
      status: "success",
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as any)
    );

    const result = await getRandomDogImage();

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(result.imageUrl).toBe(mockResponse.message);
    expect(result.status).toBe("success");
  });

  it("should throw error if API returns failure", async () => {

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      } as any)
    );

    await expect(getRandomDogImage())
      .rejects.toThrow("Failed to fetch dog image");

    expect(global.fetch).toHaveBeenCalledOnce();
  });

});
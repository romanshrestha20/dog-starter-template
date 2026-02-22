import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import express from "express";

// Mock controller BEFORE importing routes
vi.mock("../controllers/dogController", () => ({
  getDogImage: vi.fn(),
}));

import dogRoutes from "../routes/dogRoutes";
import { getDogImage } from "../controllers/dogController";

const app = express();
app.use(express.json());
app.use("/api/dogs", dogRoutes);

describe("Dog Routes", () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Positive test
  it("GET /api/dogs/random returns 200 and success true", async () => {

    (getDogImage as any).mockImplementation(
      async (_req: any, res: any) => {
        res.status(200).json({
          success: true,
          data: {
            imageUrl: "https://mockedurl.com/dog.jpg",
            status: "success",
          },
        });
      }
    );

    const response = await request(app)
      .get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl)
      .toContain("mockedurl");
  });

  // Negative test
  it("GET /api/dogs/random returns 500 and error", async () => {

    (getDogImage as any).mockImplementation(
      async (_req: any, res: any) => {
        res.status(500).json({
          success: false,
          error: "Failed to fetch dog image: Network error",
        });
      }
    );

    const response = await request(app)
      .get("/api/dogs/random");

    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });

});
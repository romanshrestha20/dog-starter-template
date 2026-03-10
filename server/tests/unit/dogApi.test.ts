
import request  from "supertest";
import { describe, expect, it} from "vitest";
import app from '../../index'

describe("Dog Api", () => {
    it("return 200 http status with success and data containing imageUrl", async  () => {
        const response = await request(app).get("/api/dogs/random");
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.imageUrl).toBeDefined();
        expect(response.body.data.imageUrl).toBeTypeOf("string")
    } )

    it('return 404 http status code with verified error message' , async  () => {
        const response = await request(app).get("/api/dogs/invalid");
        console.log(response.body)
        
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBeTypeOf("string")
        expect(response.body.error).toBe('Route not found')
        
})
})

const axios = require('axios')

describe("GET /api/restaurant/:id", () => {
  it("should return a restaurant object", async () => {
    const res = await axios.get("http://localhost:3000/api/restaurant/567051");
    expect(res.status).toEqual(200);
    expect(res.data).toHaveProperty("name");
    expect(res.data).toHaveProperty("id");
    expect(res.data).toHaveProperty("activeTimePeriod");
    expect(res.data).toHaveProperty("menus");
    expect(res.data).toHaveProperty("coverImage");
    
  });
  it("should return a 404 status code if the restaurant is not found", async () => {
    const res = await fetch("http://localhost:3000/api/restaurant/123");
    expect(res.status).toBe(404)
    
  });
});



describe("GET /api/restaurant/:id/:menu/short", () => {
  it("should return a restaurant object", async () => {
    const res = await axios.get("http://localhost:3000/api/restaurant/567051/ข้าวผัดปลาทู/short");
    expect(res.status).toEqual(200);
    expect(res.data).toHaveProperty("name");
    expect(res.data).toHaveProperty("id");
    expect(res.data).toHaveProperty("discountedPercent");
    expect(res.data).toHaveProperty("fullPrice");
    expect(res.data).toHaveProperty("sold");
    expect(res.data).toHaveProperty("totalInStock");
  });
  it("should return a 404 status code if the restaurant is not found", async () => {
    const res = await fetch("http://localhost:3000/api/restaurant/567051/กระเพาะปลา/short")
    expect(res.status).toBe(404)
    
  });
});



describe("GET /api/restaurant/:id/:menu/full", () => {
  it("should return a restaurant object", async () => {
    const res = await axios.get("http://localhost:3000/api/restaurant/567051/ข้าวผัดปลาทู/short");
    expect(res.status).toEqual(200);
    expect(res.data).toHaveProperty("name");
    expect(res.data).toHaveProperty("id");
    expect(res.data).toHaveProperty("discountedPercent");
    expect(res.data).toHaveProperty("fullPrice");
    expect(res.data).toHaveProperty("sold");
    expect(res.data).toHaveProperty("totalInStock");
  });
  it("should return a 404 status code if the restaurant is not found", async () => {
    const res = await fetch("http://localhost:3000/api/restaurant/567051/กระเพาะปลา/short")
    expect(res.status).toBe(404)
    
  });
});



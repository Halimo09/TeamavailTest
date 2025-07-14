const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require("supertest");
const { app, server } = require("../server");
const fs = require("fs");
const path = require("path"); 

describe("Server Endpoints", () => {
  afterAll((done) => {
    server.close(done);
  });

  it("should serve index.html", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain("Team Availability");
  });

  it("should handle history saving", async () => {
    const testData = { test: "data" };
    const res = await request(app).post("/save-history").send(testData);

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Saved");

    // Cleanup test file
    const historyPath = path.join(__dirname, "../output/history.json");
    if (fs.existsSync(historyPath)) {
      fs.unlinkSync(historyPath);
    }
  });
});

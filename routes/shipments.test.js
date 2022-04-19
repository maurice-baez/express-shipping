"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("invalid productId", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.error.status).toEqual(400);
    expect(resp.body.error.message).toEqual(["instance.productId must be greater than or equal to 1000"]);
  });


  test("invalid name", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1002,
      name: 100,
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.error.status).toEqual(400);
    expect(resp.body.error.message).toEqual(["instance.name is not of a type(s) string"]);
  });


  test("invalid addr", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 10000,
      name: "Test Tester",
      addr: 123123,
      zip: "12345-6789",
    });

    expect(resp.error.status).toEqual(400);
    expect(resp.body.error.message).toEqual(["instance.addr is not of a type(s) string"]);
  });


  test("invalid zipcode", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 10000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: 12569,
    });

    expect(resp.error.status).toEqual(400);
    expect(resp.body.error.message).toEqual(["instance.zip is not of a type(s) string"]);
  });
});

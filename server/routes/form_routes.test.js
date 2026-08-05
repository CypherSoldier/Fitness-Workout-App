// form_routes.test.js
jest.mock('../config/db', () => jest.fn()); // no-op, never touches real Mongo

const request = require("supertest");
const app = require("../server");
const Form = require("../models/form_model");

jest.mock('../models/form_model');

describe("POST /submit", () => {
  afterEach(() => jest.clearAllMocks());

  it("calls the controller and returns 200", async () => {
    const mockSave = jest.fn().mockResolvedValue({});
    Form.mockImplementation(() => ({ save: mockSave }));

    const res = await request(app)
      .post("/submit")
      .send({
        name: 'Bench Press',
        sets: 4,
        reps: 6,
        kgs: 50,
        exercise: 'Chest',
        image: 'null',
        date: '2025-12-06T00:00:00.000+00:00',
        user: "Caleb",
        day: "Tuesday"
      })
      .expect(200);

    expect(res.text).toBe("Exercise added successfully!");
    expect(mockSave).toHaveBeenCalled();
  });

  it("returns 500 when save fails", async () => {
    const mockSave = jest.fn().mockRejectedValue(new Error("Validation failed"));
    Form.mockImplementation(() => ({ save: mockSave }));

    const res = await request(app)
      .post("/submit")
      .send({
        name: 'Bench Press',
        sets: 4,
        reps: 6,
        kgs: 50,
        exercise: 'Chest',
        image: 'null',
        date: '2025-12-06T00:00:00.000+00:00',
        user: "Caleb",
        day: "Tuesday"
      })
      .expect(500);

    expect(res.text).toBe("Error adding exercise: Validation failed");
  });
});

describe("GET /exercises", () => {
  afterEach(() => jest.clearAllMocks());

  it("calls GET controller and returns 200 with the docs", async () => {
    const mockDocs = [
      { user: 'Caleb Wagner', name: 'Bench Press', sets: 4, reps: 6, kgs: 50 }
    ];
    Form.find = jest.fn().mockResolvedValue(mockDocs);

    const res = await request(app)
      .get("/exercises")
      .expect(200);

    expect(Form.find).toHaveBeenCalledWith({ user: 'Caleb Wagner' });
    expect(res.body).toEqual(mockDocs);
  });

  it("returns 500 when find fails", async () => {
    Form.find = jest.fn().mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .get("/exercises")
      .expect(500);

    expect(res.text).toBe("Error fetching document");
  });
});

describe("DELETE /exercises/:id", () => {
  afterEach(() => jest.clearAllMocks());

  it("calls DELETE controller and returns the deleted doc with 200", async () => {
    const mockExercise = { _id: '123', name: 'Bench Press' };
    Form.findById = jest.fn().mockResolvedValue(mockExercise);
    Form.findByIdAndDelete = jest.fn().mockResolvedValue(mockExercise);

    const res = await request(app)
      .delete("/exercises/123")
      .expect(200);

    expect(Form.findById).toHaveBeenCalledWith('123');
    expect(Form.findByIdAndDelete).toHaveBeenCalledWith('123');
    expect(res.body).toEqual(mockExercise);
  });
});
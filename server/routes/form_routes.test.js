jest.mock("../config/db", () => jest.fn());

const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../server");
const Form = require("../models/form_model");

jest.mock("../models/form_model");

const user = { id: "account-123", display_name: "Caleb" };
const exercise = {
  name: "Bench Press",
  sets: 4,
  reps: 6,
  kgs: 50,
  exercise: "Chest",
  day: "Tuesday",
};
let token;

beforeEach(() => {
  process.env.ACCESS_TOKEN_SECRET = "test-secret";
  token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
});

afterEach(() => jest.clearAllMocks());

test("POST /submit stores and returns the account-owned exercise", async () => {
  const saved = { _id: "exercise-1", ...exercise, user_id: user.id };
  Form.create = jest.fn().mockResolvedValue(saved);

  const res = await request(app)
    .post("/submit")
    .set("Authorization", `Bearer ${token}`)
    .send(exercise)
    .expect(201);

  expect(Form.create).toHaveBeenCalledWith(
    expect.objectContaining({ user_id: user.id }),
  );
  expect(res.body).toEqual(saved);
});

test("GET /exercises filters by the authenticated account", async () => {
  const docs = [{ _id: "exercise-1", ...exercise }];
  Form.find = jest.fn().mockResolvedValue(docs);

  const res = await request(app)
    .get("/exercises")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);

  expect(Form.find).toHaveBeenCalledWith({ user_id: user.id });
  expect(res.body).toEqual(docs);
});

test("protected exercise routes reject requests without an account token", async () => {
  await request(app).get("/exercises").expect(401);
});

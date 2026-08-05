const { submitExercise, retrieveExercise, deleteExercise } = require("./form_controller");
const Form = require("../models/form_model");

jest.mock('../models/form_model');

describe('submitExercise controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                name: 'Bench Press',
                sets: 4,
                reps: 6,
                kgs: 50,
                exercise: 'Chest',
                image: 'null',
                date: '2025-12-06T00:00:00.000+00:00',
                user: "Caleb",
                day: "Tuesday"
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('saves exercise to database', async () => {
        const mockSave = jest.fn().mockResolvedValue({});
        Form.mockImplementation(() => ({
            save: mockSave
        }));

        await submitExercise(req, res);

        expect(Form).toHaveBeenCalledWith(req.body);
        expect(mockSave).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("Exercise added successfully!");
    });

    it("returns 500 when save fails", async () => {
        const mockError = new Error("Validation failed");
        const mockSave = jest.fn().mockRejectedValue(mockError);
        Form.mockImplementation(() => ({
            save: mockSave
        }));

        await submitExercise(req, res);
        await new Promise(setImmediate); // flush pending microtasks (lets .then().catch() settle)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            "Error adding exercise: Validation failed"
        );
    });
});

describe('retrieveExercise controller', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("retrieves exercises and returns 200 with the docs", async () => {
        const mockDocs = [
            { user: 'Caleb Wagner', name: 'Bench Press', sets: 4, reps: 6, kgs: 50 }
        ];
        Form.find = jest.fn().mockResolvedValue(mockDocs);

        await retrieveExercise(req, res);

        expect(Form.find).toHaveBeenCalledWith({ user: 'Caleb Wagner' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockDocs);
    });

    it("returns 500 when find fails", async () => {
        Form.find = jest.fn().mockRejectedValue(new Error("DB error"));

        await retrieveExercise(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Error fetching document");
    });
});

describe('deleteExercise controller', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { id: 'abc123' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deletes an exercise and returns the deleted doc with 200", async () => {
        const mockExercise = { _id: 'abc123', name: 'Bench Press' };
        Form.findById = jest.fn().mockResolvedValue(mockExercise);
        Form.findByIdAndDelete = jest.fn().mockResolvedValue(mockExercise);

        await deleteExercise(req, res);

        expect(Form.findById).toHaveBeenCalledWith('abc123');
        expect(Form.findByIdAndDelete).toHaveBeenCalledWith('abc123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockExercise);
    });
});
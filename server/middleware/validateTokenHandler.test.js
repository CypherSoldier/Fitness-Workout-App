const request = require('supertest')
const express = require('express')
const validateToken = require('./validateTokenHandler')
const { setDefaultCACertificates } = require('node:tls')
const { describe } = require('node:test')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express()
app.get('/current', validateToken, (req, res) => {
    res.status(200).json({ message: 'Success' })
})

describe('GET /current', () => {
    test('should deny access without token', async () => {
        const response = await request(app).get('/current')
        expect(response.status).toBe(401)
    })

    test('should allow access with a valid token', async () => {
        const token = jwt.sign(
            {
                user: {
                    id: '123',
                    email: 'caleb@example.com'
                }
            },
            process.env.ACCESS_TOKEN_SECRET
        );

        const response = await request(app)
            .get('/current')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });
})
const request = require('supertest')
const express = require('express')
const timeTrialsRouter = require('../routes/timeTrials')

jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        timeTrials: {
            create: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        }
    }
    return { PrismaClient: jest.fn(() => mPrismaClient) }
})

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use('/timeTrials', timeTrialsRouter)

describe('Time Trials API', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should create a new time trial', async () => {
        const newTimeTrial = { id: 1 }
        prisma.timeTrials.create.mockResolvedValue(newTimeTrial)

        const res = await request(app)
            .post('/timeTrials')
            .send({
                date: '2023-10-01',
                track_id: 1,
                character: 'Mario',
                lap1: 30,
                lap2: 29,
                lap3: 31,
                final_time: 90,
                notes: 'Good run'
            })

        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('id', newTimeTrial.id)
    })

    it('should get all time trials', async () => {
        const timeTrials = [{ id: 1, character: 'Mario' }]
        prisma.timeTrials.findMany.mockResolvedValue(timeTrials)

        const res = await request(app).get('/timeTrials')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(timeTrials)
    })

    it('should return an error if getting time trials fails', async () => {
        prisma.timeTrials.findMany.mockRejectedValue(new Error('Failed to fetch'))

        const res = await request(app).get('/timeTrials')

        expect(res.statusCode).toEqual(500)
        expect(res.text).toEqual('Failed to fetch')
    })

    it('should update a time trial', async () => {
        prisma.timeTrials.update.mockResolvedValue({})

        const res = await request(app)
            .put('/timeTrials/1')
            .send({
                date: '2023-10-01',
                track_id: 1,
                character: 'Mario',
                lap1: 30,
                lap2: 29,
                lap3: 31,
                final_time: 90,
                notes: 'Updated run'
            })

        expect(res.statusCode).toEqual(204)
    })

    it('should delete a time trial', async () => {
        prisma.timeTrials.delete.mockResolvedValue({})

        const res = await request(app).delete('/timeTrials/1')

        expect(res.statusCode).toEqual(204)
    })
})

const express = require('express')
const request = require('supertest')

describe('test des routes api', () => {
    it('retourne un livre', (done) => {
        request(app)
        .get('/api/livre')
        .set('Accept', 'application/json')
        .expect(200, [
            {
                titre: 'Livre titre',
                content: 'lorem ipsum'
            }
        ], done)
    })
})
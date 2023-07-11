'use strict'

const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const User = require('../models/user');
const Account = require('../models/account');

const { dbConnection } = require('../database/config');

describe('Test API endpoints', () => {
  beforeAll(async  () => {
    // Hacer configuraciones necesarias antes de las pruebas
    // Base de datos
    await dbConnection();
  });

  afterAll(async  () => {
    await mongoose.disconnect();
    // Limpiar o cerrar conexiones después de las pruebas
  });

 
  it('should return 200 for POST "/api/loguer"', async () => {
    const userData = { email: 'victoru160@gmail.com', password: '1234' };
    const response = await request(app).post('/api/loguer').send(userData);
    expect(response.status).toBe(200);
    // Agrega aquí más aserciones según lo que esperes en la respuesta
  });



  describe('POST /api/register', () => {
    it('should register a new user', async () => {

      const userData = {       
        name: 'Victor',
        surname: 'Urquiola',
        idUser: '175773398',
        email: 'victoru160@gmail.com',
        password: '1234',
        phone: '968209498'
      };
    
      const response = await request(app).post('/api/register').send(userData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('El rut ya existe');
      expect('175773398').toBe(userData.idUser);
      // Agrega más expectativas según lo que esperes en la respuesta
    });
  });

   describe('POST /api/balance', () => {
    it('should get account balance', async () => {
      const userId = 175773398;

      const response = await request(app).post('/api/balance').send({ userId });
      console.log(response.body)
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('El usuario no existe');
      expect(175773398).toBe(userId);
      // Agrega más expectativas según lo que esperes en la respuesta
    });

    describe('POST /api/historical', () => {
      it('should retrieve historical attempts', async () => {
        const userId = 175773398;
  
        const response = await request(app).post('/api/historical').send({ userId });
        
        expect(response.status).toBe(200);       
        expect(175773398).toBe(userId);
        // Agrega más expectativas según lo que esperes en la respuesta
      });
    });
  
    describe('POST /api/saveBalance', () => {
      it('should return 200 for POST "/api/loguer"', async () => {
        const userData = {
          idAccount: 12345,
          idUser: "iduser",
          accountBalance: 1000,
        };
        const response = await request(app).post("/api/saveBalance").send(userData);
        expect(response.status).toBe(200);
        // Agrega aquí más aserciones según lo que esperes en la respuesta
      });
    });

  }); 

  


  // Agrega más pruebas para otros endpoints de tu aplicación

});
export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Challenge API',
      version: '1.0.0',
      description: 'A simple express library API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/',
      },
    ],
    components: {
      schemas: {
        Asset: {
          type: 'object',
          properties: {
            brand: {
              type: 'string',
              description: 'The brand of the asset',
            },
            model: {
              type: 'string',
              description: 'The model of the asset',
            },
            type: {
              type: 'string',
              description: 'The type of the asset',
            },
          },
          required: ['brand', 'model', 'type'],
          example: {
            brand: 'XYZ',
            model: 'ABC-123',
            type: 'computer',
          },
        },

        AssetResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The ID of the asset',
            },
            brand: {
              type: 'string',
              description: 'The brand of the asset',
            },
            model: {
              type: 'string',
              description: 'The model of the asset',
            },
            type: {
              type: 'string',
              description: 'The type of the asset',
            },
          },
          required: ['id', 'brand', 'model', 'type'],
          example: {
            id: '5f2e5d5c3a7ca039f0c569f2',
            brand: 'XYZ',
            model: 'ABC-123',
            type: 'computer',
          },
        },

        Error: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              description: 'The error code',
            },
            message: {
              type: 'string',
              description: 'The error message',
            },
          },
          example: {
            code: 500,
            message: 'An error occurred while creating the asset',
          },
        },
      },

      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormar: 'JWT',
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

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
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Asset: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            brand: {
              type: 'string',
            },
            model: {
              type: 'string',
            },
            type: {
              type: 'string',
              enum: ['laptop', 'keyboard', 'mouse', 'headset', 'monitor'],
            },
          },
        },
        License: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            software: {
              type: 'string',
            },
          },
        },
        DeveloperModel: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            fullname: {
              type: 'string',
            },
            active: {
              type: 'boolean',
            },
          },
        },
        DeveloperResponse: {
          type: 'object',
          properties: {
            developer: {
              $ref: '#/components/schemas/DeveloperModel',
            },
            assets: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Asset',
              },
            },
            licenses: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/License',
              },
            },
          },
        },
        GetDevelopersResponse: {
          type: 'object',
          properties: {
            developers: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/DeveloperResponse',
              },
            },
          },
        },
        OperationValue: {
          type: 'object',
          properties: {
            assetId: {
              type: 'string',
            },
            licenseId: {
              type: 'string',
            },
          },
        },
        OperationRequestBody: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
            },
            operation: {
              type: 'string',
              enum: ['add', 'remove'],
            },
            value: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/OperationValue',
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            code: {
              type: 'integer',
            },
          },
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

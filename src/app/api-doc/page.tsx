// src/app/api-doc/page.tsx
import SwaggerUIComponent from '@/components/swagger/SwaggerUiComponent'
import { createSwaggerSpec } from 'next-swagger-doc'

const ApiDocPage = async () => {
  // Swagger spec 생성

  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Next.js Swagger API',
      version: '1.0.0',
      description: 'API documentation for Next.js project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  }

  const swaggerSpec = createSwaggerSpec({
    definition: swaggerDefinition,
    apiFolder: 'src/app/api',
  })

  return <SwaggerUIComponent spec={swaggerSpec} />
}

export default ApiDocPage

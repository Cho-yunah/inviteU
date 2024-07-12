// src/components/SwaggerUIComponent.tsx
'use client'

import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

interface SwaggerUIComponentProps {
  spec: any
}

const SwaggerUIComponent: React.FC<SwaggerUIComponentProps> = ({ spec }) => {
  return <SwaggerUI spec={spec} />
}

export default SwaggerUIComponent

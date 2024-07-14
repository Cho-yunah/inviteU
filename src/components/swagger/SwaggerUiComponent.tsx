// src/components/SwaggerUIComponent.tsx
'use client'

import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

interface SwaggerUIComponentProps {
  spec: any
}

const SwaggerUIComponent: React.FC<SwaggerUIComponentProps> = ({ spec }) => {
  return (
    <div className="h-[600vh] bg-white">
      <SwaggerUI spec={spec} />
    </div>
  )
}

export default SwaggerUIComponent

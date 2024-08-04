'use client'
import React from 'react';

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div >
            <div >오류가 발생했습니다.</div>
            <button
                onClick={() => {
                    window.location.reload();
                }}
                
            >
                새로고침
            </button>
        </div>
    );
    }

    return this.props.children as React.ReactNode;
  }
}

export default ErrorBoundary;

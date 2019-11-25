import React, {Component} from 'react';
import jonahHill from '../images/jonahHill.gif'


class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false};
    }

    static getDerivedStateFromError(error){
      return {hasError: true}
    }
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      console.log(error, errorInfo);
    }

    
    
    render() {
      const {hasError} = this.state
      if (hasError) {
        // Error path
        return (
          <div>
            <h2>Something went wrong.</h2>
            <h4>Refresh the page to try again</h4>
            <img src={jonahHill} alt="error gif"  width="500px" height="273px"/>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }
  export default ErrorBoundary;
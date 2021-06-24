import React, { Component } from 'react'



class Interaction extends Component {
  componentDidMount() {
    window.addEventListener("mousemove", this.handleMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseMove = (e: MouseEvent) => {
    
  }


  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Interaction;

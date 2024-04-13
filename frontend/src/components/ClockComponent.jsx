import React, { Component } from "react";

class ClockComponent extends Component{

    constructor() {
        super();
        this.state = {
            date: new Date()
        };
        this.tickClock = this.tickClock.bind(this)
    }

    componentDidMount() {
        setInterval(this.tickClock, 1000);
    }

    componentWillUnmount() {

    }

    tickClock(){
        this.setState({
            date: new Date()
        })
    }

    render(){
        return(
            <div>
                {this.state.date.toLocaleDateString()} &nbsp;
                {this.state.date.toLocaleTimeString()}
            </div>
        );
    }

}

export default ClockComponent
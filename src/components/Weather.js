import React, { Component } from 'react';

class Weather extends Component {
    constructor(props){
        super(props);
        this.key = 0;
        this.state = this.props.data[this.key];
        this.cityCount = Object.keys(this.props.data).length;
    }

    componentWillReceiveProps(nextProps) {
        this.cityCount = Object.keys(nextProps.data).length;
        this.setState(nextProps.data[this.cityCount-1]);
    }


    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(), 5000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    tick(){
        this.key = this.key < this.cityCount-1 ? ++this.key : 0;
        this.setState(this.props.data[this.key]);
    }

    render() {
        return (
            <div className="card">
                <div className="temp-info">
                    <span className="temp">
                        {this.state.temp}
                        <span className="fer"><sup><i>&#x2109;</i></sup></span>
                    </span>
                    <span className="high-low">
                        <div className="temp-hl">
                            <strong>H: </strong>{this.state.high}
                            <span className="small-fer"><sup><i>&#x2109;</i></sup></span>
                        </div>
                        <div className="temp-hl">
                            <strong>L: </strong>{this.state.low}
                            <span className="small-fer"><sup><i>&#x2109;</i></sup></span>
                        </div>
                    </span>
                </div>
                <div>{this.state.text}</div>
                <div className="city-name">{this.state.city}</div>
            </div>
        )
    }
}

export default Weather
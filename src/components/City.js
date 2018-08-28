import React, { Component } from 'react';
import Weather from './Weather';
import Footer from './Footer';
import { fetchPopularRepos } from './api';

class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: this.props.data,
            value: ''
        }
        this.addValue = this.addValue.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }


    addValue(evt) {
        evt.preventDefault();
        if(this.state.value != undefined && this.state.value.length > 0) {
            fetchPopularRepos('text="'+this.state.value+'"').then(data => {
                let count = Object.keys(this.state.cities).length;
                this.state.cities[count] = data[0];
                this.setState({
                    cities: this.state.cities,
                    value: ''
                });
                document.getElementById('city-input').value = '';
            })
        }
    }

    updateInput(evt){
        this.state.value = evt.target.value;
    }

    render() {
        return (
            <div className="container">
                <div className="add">
                    <form className="form">
                        <input id="city-input" type="text" onChange={this.updateInput} />
                        <button className="button" onClick={this.addValue}>&#x2b;</button>
                    </form>
                </div>
                <Weather data={this.state.cities} />
                <Footer />
            </div>
        )
    }
}

export default City;
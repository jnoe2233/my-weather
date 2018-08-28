import React, { Component } from 'react';
import City from './City';

class App extends Component {
    render() {
        return (
            <div>
                <City data={this.props.data} />
            </div>
        );
    }
}

export default App
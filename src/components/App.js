// Modules
import React from 'react';

// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

// Data
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            fishes: {},
            order: {}
        };

        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
    }

    componentWillMount() {
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        let localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(
            `order-${this.props.params.storeId}`,
            JSON.stringify(nextState.order)
        );
    }

    addFish(fish) {
        let fishes = {...this.state.fishes};

        fishes[`fish-${Date.now()}`] = fish;

        this.setState({ fishes });
    }

    updateFish(key, updatedFish) {
        let fishes = {...this.state.fishes};
        fishes[key] = updatedFish;

        this.setState({ fishes });
    }

    loadSamples() {
        this.setState({ fishes: sampleFishes });
    }

    addToOrder(key) {
        let order = {...this.state.order};

        order[key] = order[key] + 1 || 1;

        this.setState({ order });
    }


    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    {/* Header Component */}
                    <Header tagline="Fresh Seafood Market" />
                    
                    {/* Menu list of all fishes */}
                    <ul className="list-of-fishes">
                        {
                            Object.keys(this.state.fishes).map(key  => {
                                return <Fish
                                             key={key}
                                             index={key}
                                             details={this.state.fishes[key]}
                                             addToOrder={this.addToOrder}
                                        />
                            })
                        }
                    </ul>
                </div>
                
                {/* User Order Component */}
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}
                />
                
                {/* All Inventory Component */}
                <Inventory
                    fishes={this.state.fishes}
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    loadSamples={this.loadSamples}
                />
            </div>
        );
    }
}

export default App;
import React, { PropTypes } from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    constructor() {
        super();

        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, key) {
        let fish = this.props.fishes[key];

        let updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        };

        this.props.updateFish(key, updatedFish);
    }

    renderInventory(key) {
        let fish = this.props.fishes[key];

        return (
            <div className="fish-edit" key={key}>
                {/* Fish Name*/}
                <input 
                    name="name" 
                    type="text" 
                    placeholder="Fish Name"
                    value={fish.name} 
                    onChange={(e) => this.handleChange(e, key)}
                />

                {/* Fish Price */}
                <input 
                    name="price" 
                    type="text" 
                    placeholder="Fish Price"
                    value={fish.price} 
                    onChange={(e) => this.handleChange(e, key)}
                />

                {/* Fish Availablity */}
                <select name="status"
                        value={fish.status}
                        onChange={(e) => this.handleChange(e, key)}
                >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out</option>
                </select>

                {/* Fish Description */}
                <textarea
                    name="desc"
                    type="text"
                    placeholder="Fish Desc"
                    value={fish.desc}
                    onChange={(e) => this.handleChange(e, key)}
                >
                </textarea>

                {/* Fish Thumbnail */}
                <input 
                    name="image"
                    type="text"
                    value={fish.image} placeholder="Fish Image"
                    onChange={(e) => this.handleChange(e, key)}
                />

                {/* Remove Fish from Inventory */}
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)} 
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Samples Fishes</button>
            </div>
        );
    }
}

Inventory.propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired
}

export default Inventory;
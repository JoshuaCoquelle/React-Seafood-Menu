import React from 'react';
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
                <input name="name" type="text" value={fish.name} placeholder="Fish Name"
                    onChange={(e) => this.handleChange(e, key)}
                />
                <input name="price" type="text" value={fish.price} placeholder="Fish Price"
                    onChange={(e) => this.handleChange(e, key)}
                />
                <select name="status" value={fish.status}
                    onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea name="desc" type="text" value={fish.desc} placeholder="Fish Desc"
                    onChange={(e) => this.handleChange(e, key)}>
                </textarea>
                <input name="image" type="text" value={fish.image} placeholder="Fish Image"
                    onChange={(e) => this.handleChange(e, key)}
                />
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

export default Inventory;
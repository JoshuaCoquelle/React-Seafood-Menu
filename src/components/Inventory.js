import React, { PropTypes } from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
    constructor() {
        super();

        this.state = {
            uid: null,
            owner: null
        };

        this.renderInventory = this.renderInventory.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        base.onAuth((user) => {
            if (user) {
                this.authHandler(null, { user })
            }
        });
    }

    handleChange(e, key) {
        let fish = this.props.fishes[key];

        let updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        };

        this.props.updateFish(key, updatedFish);
    }

    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your inventory</p>

                {/* Github Authentication */}
                <button className="github" onClick={() => this.authenticate('github')}>
                    Login with Github
                </button>

                {/* Facebook Authentication */}
                <button className="facebook" onClick={() => this.authenticate('facebook')}>
                    Login with Facebook
                </button>

                {/* Twitter Authentication */}
                <button className="twitter" onClick={() => this.authenticate('twitter')}>
                    Login with Twitter
                </button>
            </nav>
        );
    }

    authenticate(provider) {
        console.log(`Attempting to login with ${provider}...`);

        base.authWithOAuthPopup(provider, this.authHandler);
    }

    authHandler(err, authData) {
        if (err) {
            console.error(err);

            return
        }

        // get store
        let storeRef = base.database().ref(this.props.storeId);

        storeRef.once('value', (snapshot) => {
            let data = snapshot.val() || {};

            if (!data.owner) {
                storeRef.set({ owner: authData.user.uid });
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            });
        });
    }

    logout() {
        base.unauth();

        this.setState({ uid: null });
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
        let logout = <button onClick={this.logout}>Log Out</button>;

        if (!this.state.uid) {
            return <div>{this.renderLogin()}</div>;
        }

        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you aren't the owner of this store!</p>
                    {logout}
                </div>
            );
        }

        return (
            <div>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(this.renderInventory)} 
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Samples Fishes</button>
            </div>
        );
    }
}

Inventory.propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
}

export default Inventory;
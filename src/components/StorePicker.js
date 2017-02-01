import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    goToStore(event) {
        event.preventDefault();

        let storeId = this.storeInput.value;

        this.context.router.transitionTo(`/store/${storeId}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
                <h2>Please Enter a Store</h2>
                <input type="text"
                       placeholder="Store Name"
                       defaultValue={getFunName()}
                       ref={(input) => this.storeInput = input}
                       required
                />
                <button type="submit">Visit Store -></button>
            </form>
        );
    }
}

// "Sufaces" the react router to make available to this component
StorePicker.contextTypes = {
    router: React.PropTypes.object
};

export default StorePicker;
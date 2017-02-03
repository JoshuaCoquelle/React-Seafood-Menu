import React, { PropTypes } from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
    constructor() {
        super(); 

        this.renderOrder = this.renderOrder.bind(this);
    }

    renderOrder(key) {
        let fish = this.props.fishes[key];
        let count = this.props.order[key];
        let removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>;

        if (!fish || fish.status === 'unavailable') {
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is not available. {removeButton}</li>;
        }

        return (
            <li key={key}>
                <span>{count}lbs {fish.name} {removeButton}</span>
                <span className="price">
                    {formatPrice(count * fish.price)}
                </span>
            </li>
        );
    }

    render() {
        let orderIds = Object.keys(this.props.order);

        let total = orderIds.reduce((prevTotal, key) => {
            let fish = this.props.fishes[key];
            let count = this.props.order[key];
            let isAvailable = fish && fish.status === 'available';

            if (isAvailable) {
                return prevTotal + (count * fish.price || 0);
            }

            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Your Order</h2>

                <ul className="order">
                    {orderIds.map(this.renderOrder)}

                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        );
    }
}

Order.propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired
};

export default Order;
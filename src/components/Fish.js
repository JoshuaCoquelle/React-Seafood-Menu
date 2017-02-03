import React, { PropTypes } from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
    render() {
        let { details, index, addToOrder } = this.props;
        let isAvailable = details.status === 'available';
        let buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';

        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name}/>

                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>

                <p>{details.desc}</p>

                <button onClick={() => addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
            </li>
        );
    }
}

Fish.propTypes = {
    details: PropTypes.object.isRequired,
    index: PropTypes.string.isRequired,
    addToOrder: PropTypes.func.isRequired
};

export default Fish;
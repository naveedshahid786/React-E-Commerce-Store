import React, { Component } from 'react';
import util from '../util'

export default class Basket extends Component {
    render() {
        const { cartItems } = this.props;

        return (
            <div className="alert alert-info">
                {cartItems.length === 0 || !cartItems ? "Basket is empty" :
                    <div>You have {cartItems.length} products in the basket. <hr /></div>
                }
                {cartItems.length > 0 &&
                    <div>
                        <ul style={{ marginLeft: -40 }}>
                            {cartItems.map(item => (
                                <div key={item.id}>
                                    <b>{item.title}</b>
                                    <button style={{ float: 'right' }} className="btn btn-danger btn-sm"
                                        onClick={(e) => this.props.handleRemoveFromCart(e, item)}>X</button>
                                    <br />
                                    {item.count} x {util.formatCurrency(item.price)} = {util.formatCurrency(item.count * item.price)}
                                </div>))
                            }
                        </ul>
                        <b style={{ float: 'right' }}>Total Amount = {util.formatCurrency(cartItems.reduce((a, c) => (a + c.price * c.count), 0))}
                        </b>
                        <hr />
                        <button onClick={() => alert('Todo: Implement checkout page.')} className="btn btn-outline-success">Checkout</button>
                    </div>
                }
            </div>
        )
    }
}
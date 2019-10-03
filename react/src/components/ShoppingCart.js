import React, { Component } from "react"
import CartItem from './CartItem'
import ShoppingDock from './ShoppingDock'
import Unknown from './Unknown'
import Cookies from 'js-cookie'

const store = configureStore()

class ShoppingCart extends Component {

  state = { isEditDisable: false, itemEditUrl: "/cart/EditCartItem/afeff365-4f29-4510-bd78-5f64ef18f306/ed739f4c-d4cd-4e68-9614-3fcc28445257", disabled: false, subtotal: this.props.OrderSubtotal, totals:[] }

  render() {

    const cartId = Cookies.get('SessionGuid');

    const { items } = this.props;

    return <div class="ShoppingList">
      <div class="ShoppingList__header">
        <div class="ShoppingList__header-item">Item Info</div>
        <div class="ShoppingList__header-item">Quantity</div>
        <div class="ShoppingList__header-item">Price</div>
      </div>
      

      <div class="ShoppingList__product-item--quantity">
        {items.map((item, index) => {
          return <CartItem key={index + 1} id={index + 1} type="number" onClick={() => console.log("testing!! Clickeded!!")} quantity={this.state.qty} {...item} cartId="afeff365-4f29-4510-bd78-5f64ef18f306" itemId="ed739f4c-d4cd-4e68-9614-3fcc28445257" isEditDisable={false} />
        })}
      </div>
      <Unknown></Unknown>
      <ShoppingDock total={this.state.total} cartId="afeff365-4f29-4510-bd78-5f64ef18f306" disabled={this.state.disabled}>
        <ShoppingCartDock>
          <ShoppingCartDock__left></ShoppingCartDock__left>
          <ShoppingCartDock_right></ShoppingCartDock_right>
        </ShoppingCartDock>
      </ShoppingDock>
    </div>
   }
}

export default ShoppingCart

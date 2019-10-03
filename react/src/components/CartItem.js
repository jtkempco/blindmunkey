import React, { Component } from "react"
import CartItemCTABlock from './CartItemCTABlock'
import Incrementer from './Incrementer'
import ConfiguredProduct from './ConfiguredProduct2'
import Unknown from './Unknown'
import CurrencyFormat from 'react-currency-format'
import $ from 'jquery'
import Cookies from 'js-cookie'



class CartItem extends Component {

    state = {quantity: 1, subtotal: 0, requestQueue: []};
    
    cartId = "afeff365-4f29-4510-bd78-5f64ef18f306";

    itemid = "ed739f4c-d4cd-4e68-9614-3fcc28445257";

    endpoint = "/";

    id = 1;


    onTotalChange = () => {
      

    }

    notifyLoading = () => {


    }

  updateCartItemQuantity = () => {
    alert("ShoppingList__product-item--quantity is open !!! " + this.state.quantity );
    this.updateCartItemQuantity
  }

  componentDidMount() {
    let subtotal = (isNaN(this.props.qty * this.props.price) ? 0 : (this.props.qty * this.props.price));
    this.setState({ subtotal: subtotal, quantity: this.props.qty, price: this.props.price });
  }

  componentWillReceiveProps(nextProps) {
    let subtotal = (isNaN(nextProps.price * nextProps.qty) ? 0 : (nextProps.price * nextProps.qty));
    this.setState({ subtotal: subtotal, quantity: nextProps.qty, price: nextProps.price });
  }

  removeFromCart = (e) => {
      e.preventDefault(), 
      e.stopPropagation();
      const removeItem = confirm("This will remove the item from the cart. Do you want to continue ?");
      if( removeItem ) {
        $.post(pageConfig.baseURL + "shoppingcart/removeFromCart/" + this.props.rowid, {}, null, "json").then(response => {
            window.location.href = pageConfig.baseURL + "cart";
        })
      }
  }

  updateCartItemQuantity(newQuantity) {
        this.setState({ subtotal: this.state.price, quantity: newQuantity, price: this.props.price });
        $.post(pageConfig.baseURL + "shoppingcart/updateCartItemQuantity/" + this.props.rowid, {}, null, "json").then(response => {
      })
    }

  render() {
    const { id, qty, name, displayImages, oversize, options, prices, rowid, href } = this.props;
    const   oversized = oversize === true ? <Unknown /> : null;
    

    return (
      <div class="CartItem">
        <form class="ShoppingList__product-form" method="post" onChange={}>
          <div class="ShoppingList__product" data-id={id}>
            <div class="ShoppingList__product-item">
              <div class="ShoppingList__product-item--info">
                <div class="ShoppingList__product-item--info__header">
                  <h3>{name}</h3>
                  <div class="ShoppingList__product-item--info__header__edit">
                    <CartItemCTABlock itemID={id} rowid={rowid} itemEditUrl={href + "guid=" + rowid} quantity={qty} updateCartItemQuantity={this.updateCartItemQuantity} />
                  </div>  
                </div>
                <div class="ShoppingList__product-item--info__image">
                  <ConfiguredProduct images={displayImages} title={name} />
                </div>
                <div class="ShoppingList__product-item--info__specs">
                  <ul class="ShoppingList__product-item--info__specs__edit">
                  {options.map(option => { return <li key={"spec-" + option.name}><strong>{option.name}: </strong><span>{option.value}</span></li> })}
                  </ul>
                </div>
              </div>
            </div>      triggerQuantityChanged
            <div class="ShoppingList__product-item--quantity" quantity={qty} updateCartItemQuantity={this.updateCartItemQuantity}>
              <Incrementer autoFill="true" errorMessages={{}} max="20" min="1" patern=".*" type="number" name="quantity" quantity={qty} rowid={rowid} triggerQuantityChanged={this.triggerQuantityChanged} />
            </div>
            <div class="ShoppingList__product-item--price">
              <div class="ShoppingList__product-item--price__edit">      

                <CartItemCTABlock ItemEditUrl="/cart/EditCartItem/afeff365-4f29-4510-bd78-5f64ef18f306/ed739f4c-d4cd-4e68-9614-3fcc28445257" cartID="afeff365-4f29-4510-bd78-5f64ef18f306" itemID="ed739f4c-d4cd-4e68-9614-3fcc28445257" />

                <CartItemCTABlock itemID={id} rowid={rowid} itemEditUrl={href + "guid=" + rowid} />

              </div>
              <ul>
                    {   
                    prices.map((price, index) => { 
                        return <li key={index}><strong>{price.name}:</strong><span><CurrencyFormat value={price.value.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></span></li> 
                    })}
                    
                    <li class="ShoppingList__subtotal"><strong>Subtotal:</strong><span><CurrencyFormat value={(price.value * quantity)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></span></li>
              </ul>
            </div>
            {oversized}
          </div>
        </form>
      </div>
    )
  }
}

export default CartItem

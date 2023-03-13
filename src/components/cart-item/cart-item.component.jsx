import { CartItemContainer, ItemDetails } from './cart-item.styles';

const CartItem = ({ cartItem: { name, imageUrl, quantity, price } }) => {
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails className="item-details">
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles';

import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from '../../store/cart/cart.action';

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, price, quantity } = cartItem;

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer className='checkout-item-container'>
      <ImageContainer className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan className='name'>{name}</BaseSpan>
      <Quantity className='quantity'>
        <Arrow className='arrow' onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <Value className='value'>{quantity}</Value>
        <Arrow className='arrow' onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan className='price'>{price}</BaseSpan>
      <RemoveButton className='remove-button' onClick={clearItemHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
/*
          <div key={id}>
            <h2>{name}</h2>
            <span
              onClick={() => {
                removeItemFromCart(cartItem);
              }}>
              decrement
            </span>
            <span>{` ${quantity} `}</span>
            <span
              onClick={() => {
                addItemToCart(cartItem);
              }}>
              increment
            </span>
            <span
              onClick={() => {
                removeItemFromCart(cartItem, true);
              }}>
              {` delete`}
            </span>
          </div>
          */

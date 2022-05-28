import React from 'react';
import {useSelector , useDispatch} from 'react-redux';
import {CartItems} from '../../Features/ProductsReducer';

const Checkout = () => {
    const cartItems = useSelector(CartItems);

    const CounttheTotalPayment = () =>{
        let Total = 0 ;

        for(let e of cartItems){
            const DisscountValue = (parseInt(e.Discount.value) * parseInt(e.price))/100;
            const oldPrice = e.Discount.state ? parseInt(e.price) - DisscountValue: parseInt(e.price);
            const newPrice = e.Quantity * oldPrice;
            Total = Total + newPrice ;
            console.log(Total);
        }
        console.log(Total);
        return Total ;

    }

    const CardItem = (item) =>{

        const DisscountValue = (parseInt(item.value) * parseInt(item.price))/100;
        const oldprice =item.state ? parseInt(item.price) - DisscountValue: parseInt(item.price);
        const  newPrice = item.Quantity * oldprice ;
        return(
            <div style={{display: 'flex', justifyContent:"space-between",borderBottom: '1px solid #C0C0C0'}}>
                   <p>{item.name}</p>
                   <p>{item.Quantity}</p>
                   {item.type === 'total'? <p>{item.price}</p>:<p>{ newPrice }</p> }
            </div>
        )
    };

    return(
        <div>
           {cartItems.map(e => <CardItem key={e.id} state={e.Discount.state} value={e.Discount.value} name={e.title} price={e.price} Quantity={e.Quantity} />)}
           <CardItem name="total" type="total"  price={CounttheTotalPayment()} />
        </div>
    )
}

export default Checkout ;
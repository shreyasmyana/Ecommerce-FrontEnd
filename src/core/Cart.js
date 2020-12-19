import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {Link} from 'react-router-dom';
import {getItemsFromCart} from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = ()=> { 
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(()=>{
      setItems(getItemsFromCart());
    }, [run]);

    const getProducts = ()=>{
        setItems(getItemsFromCart());
    }
    const showProducts= ()=>{
        return (
            <div>
                <h2>Your Cart has {`${items.length}`} items</h2>
                <hr/>
                {
                items.map((product, i)=>(
                    <Card key={i} product={product} 
                                  showAddToCartButton={false} 
                                  updateCount={true}
                                  removeProductButton={true}
                                  setRun = {setRun}
                                  run={run}
                                  updateCart ={getProducts} />
                ))}
            </div>
        )
    }

    const showNoProductMessage = ()=>{
        return(
            <h2>Your Cart Is Empty <br/> <Link to="/shop">Continue Shopping</Link></h2>
        )
    }
    return(
        <Layout title="Shopping Cart" description="Your Cart" className='container-fluid'>
            <div className="row">
                <div className="col-6">
                    {
                        items.length>0 ? showProducts(): showNoProductMessage()
                    }
                </div>
                <div className="col-6">
                    <h2>Your Cart Summary</h2>
                    <hr/>
                    <Checkout products={items} run={run} setRun={setRun}></Checkout>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;
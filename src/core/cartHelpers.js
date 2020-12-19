export const addProduct = (item, next)=>{

    var cart = [];
    if(typeof window !== 'undefined'){
       if (localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({...item, count:1})

        cart = Array.from(new Set(cart.map(p=>p._id))).map(id=>{
            return cart.find(p=>p._id===id)
        })  

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}

export const totalProducts = ()=>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }

    return 0;
}

export const getItemsFromCart = ()=>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'));
        }
    }

    return [];
}

export const updateProductCount = (productId, count, updateCart)=>{
    let cart = [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart')) 
        }  

        cart.map((product, i)=>{
            if(product._id === productId){
                cart[i].count=count
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}
            
export const removeProduct = (productId, updateCart)=>{
    let cart = [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i)=>{
            if(product._id === productId){
                cart.splice(i,1);
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        
    }

    return cart;
}

export const emptyCart = next => {
    localStorage.removeItem('cart');
    next();
}
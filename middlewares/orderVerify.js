async function verifyOrderAndCalculate(orderProducts) {
    let total = 0;    
    for (const prod of orderProducts) {
        const product = await product.findById(prod.product);

        if(!product) throw new Error('Producto no encontrado');

        // check stock
        // if(product.stock < orderProduct.quantity) throw new Error('No hay suficiente stock');
        if(product.price !== prod.price) throw new Error('El precio del producto no coincide');
        total += prod.price * prod.quantity;
    };
    return total;
}


module.exports = verifyOrderAndCalculate
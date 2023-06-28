
let Order = []
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('currentUser'));
const cardContainer = document.getElementById('card-container')
const productsNew = JSON.parse(localStorage.getItem('Products')) || [];
let Products = []

async function cargarProductos(){
    try {
        const respuesta = await axios.get(`${URL}/products`)
        products = respuesta.data.productos
        renderizarProductos(products)
        console.log(respuesta)
        
    } catch (error) {
        console.log(error)
    }
}
cargarProductos();


function renderizarProductos(products) {
    cardContainer.innerHTML = ``;

    products.forEach((product) => {

        const card = document.createElement('article');
        card.classList.add('card');

        let imageSrc = product.image /* ? product.image : '/assets/page-notifier/not-found.png' */

        card.innerHTML = `
                <div class="card__header">
                    <img src="/upload/product/${imageSrc}" alt="${product.name}" class="card__img">
                </div>
                <div class="card__body">
                    <div class="card__title">
                        ${product.name}
                    </div>
                    <p class="card__description">
                        ${product.description}"
                    </p>
                    <div class="card__price">
                        $${product.price}
                    </div>
                </div>
                <div class="card__footer">
                
                <div class="card__btn-container">
                <a class="card__btn" onclick="addToOrder('${product._id}')" >
                Agregar al carrito
                </a> 
                </div>
                <div class="card__btn-container">
                    <a href="/product-detail?id=${product._id}" class="card__btn">
                            Ver mas 
                    </a> 
                </div>
                </div>`

        cardContainer.appendChild(card);
    });
}


async function addToOrder(id) {
    try {
        const respuesta = await axios.get(`${URL}/products/${id}`);
        const product = respuesta.data.newProduct;
        console.log(product)
        console.log(respuesta.data)
        if (!product) {
            return  Swal.fire(
                'Producto no encontrado',
                '',
                'error'
            );
        }

        const newOrder = {
            id: product._id,
            name: product.name,
            image: '/upload/product/' + product.image,
            price: product.price,
            cant: 1,
            total: product.price
        }

        const prod = Order.find((prod)=> {
            if(prod.name === product.name) {
                prod.cant = parseInt(prod.cant) + 1;
                prod.total = prod.cant * parseInt(prod.price);
                return prod;
            }
        })
        // Agregar el producto al carrito
        if(!prod) {
            Order.push(newOrder);
        }

        sessionStorage.setItem('order',JSON.stringify(Order));

        Swal.fire(
            'Producto agregado al carrito!',
            '',
            'success'
        );

    } catch (error) {
        console.log(error);
    }
}



function countCant() {
    order = JSON.parse(localStorage.getItem('order')) || [];
    let cantidad = 0
    order.forEach((prod) =>{
        cantidad += prod.cant;
    })
    badge
}

const filterInput = document.getElementById('filter');


function buscarProductosInput(evt) {
    if (evt.keycode !== 13) return;
    const text = evt.target.value.toLowerCase().trim();
    buscarProductosInput(text)
}

function filtrarProductos(text) {
    const filterProducts = productsNew.filter((product) => {
    const filter = product.name.toLowerCase().includes(text)
    return filter
});

    const find = document.getElementById('products-count');
    find.innerHTML = `En tu busqueda se encontraron ${filterProducts.length} productos`
    
renderizarProductos(filterProducts);
};




renderizarProductos(productsNew);


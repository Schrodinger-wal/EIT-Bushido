const user = JSON.parse(localStorage.getItem("currentUser"));
const params = window.location.search;
const products = [];
let Order = []
let product;

console.log(params);

const paramsURL = new URLSearchParams(params);
const paramsEntries = Object.fromEntries(paramsURL);

let indice = params.split("id=")[1];


async function obtenerProducto() {
    try {
        const respuesta = await axios.get(`${URL}/products`)
        const producto = respuesta.data.newProduct;
        return producto;
    } catch (error) {
        console.log(error);
    }
}

async function renderizarProductos(id) {
    try {
        const respuesta = await axios.get(`${URL}/products/${id}`);
        product = respuesta.data.newProduct;
        const detail = document.getElementById("product-detail");

        detail.innerHTML = `
        <section class="product-detail">
        <h2 class="product-detail__title">${product.name}</h2>
    <div class="product-detail__image-container">
        <img src="/upload/product/${product.image}" alt="Product Image${product.name}" class="product-detail__image">
    </div>
    
    <div class="product-detail__footer">
    <div class="product-detail__info">
        <p class="product-detail__description">${product.description}</p>
    <div class="product-detail__price">$${product.price}</div>
    

    <div class="product-detail__cant-container">
        <h4 class="product-detail__cant">Cantidad</h4>
    <div class="product-detail__cant-buttons">
        <button id="button-plus" onclick="AumentarProducto()">+</button>
            <input type="text" value="1" id="input-cant" class="product-detail__input-Cant" onchange="calculateTotalCant()" maxlength="2">
        <button onclick="DisminuirProducto()" id="button-minus">-</button>
    </div>
    </div>
</div>
    </div>

    <button class="product-detail__add-to-cart" onclick="addCart()">Agregar al carrito</button>

</div>
</section>
`;
    } catch (error) {
        console.log(error);
    }
}

console.log(indice)

renderizarProductos(indice);


    function AumentarProducto(id) {
        const input = document.getElementById(`input-cant${id}`)
        const value = parseInt(input.value, 10);
        input.value = isNaN(value) ? 1 : value + 1;
        cantidadProducto(id);
        }
        
    
    function DisminuirProducto(id) {
        console.log('DisminuirProducto:', id);
        var input = document.getElementById(`input-cant${id}`)
        var value = parseInt(input.value, 10);
        input.value = isNaN(value) ? 1 : value - 1;
        if (input.value < 1) {
            input.value = 1;
        }
    }


function addCart() {
    const cant = document.getElementById("input-cant");
    const newOrder = {
        id: product._id,  // Corrección aquí
        image: product.image ?
            `${URL}/upload/product/${product.image}` :
            "/assets/page-notifier/not-found.png",
        name: product.name,
        price: product.price,
        cant: parseInt(cant.value),
        total: parseInt(cant.value) * parseInt(product.price),
    };

    const prod = order.find((prod) => {
        if (prod.name === product.name) {
            prod.cant = parseInt(prod.cant) + parseInt(cant.value); 
            prod.total = prod.cant * parseInt(prod.price);
            return prod;
        }
    });
    if(!prod) {
        Order.push(newOrder);
        }
    
    // //Guardarlo en el local storage
    localStorage.setItem('order',JSON.stringify(Order));
    
    contarProductos();
    
    //Alerta de Producto agregado
    showAlert('Producto agregado a la Orden','exito');
    
}

function addToOrder() {
    const existe = order.find((prod) => {
        if (prod.name === prod.name) {
            return prod;
        }
    });
    if (!existe) addToOrder();  // Corrección aquí
    window.location.href = "/pages/order/order.html";
}


renderizarProductos();
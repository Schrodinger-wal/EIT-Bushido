let products = JSON.parse(sessionStorage.getItem('order')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

let badge = document.getElementById('cart-count');
const tbody = document.getElementById('tbody');


async function cargarOrdenes() {
    try {
        const respuesta = await axios.get(`${URL}/orders/${currentUser._id}/user`)
        const orders = respuesta.data.orders;
        renderizarTabla(orders)
    } catch (error) {
        console.log(error)
    }
}


let editIndex;

function renderizarTabla() {
    let totalOrden = "";
    tbody.innerHTML = '';
    if (products.length === 0) {
        tbody.innerHTML = `<tr class="disabled"> <td colspan="6">No se encontraron productos</td> </tr>`;
        return;
    }

    products.forEach((producto, index) => {

        const tableRow = `
        <tr class="product">
            <td class="product__img-cell" >
                <img class="product__img" src="${producto.image}" width="120px" alt="${producto.name}">
            </td>
            <td  class="product__name">
                ${producto.name}
            </td>
            <td  class="product__price">
                $${producto.price}
            </td>
            <td  class="product__actions">
                <div class="order-cant-btn">
                    <button class="product__action-btn" onclick="DisminuirProducto('${index}')">-</button>
                    <input class="order-cant-btn__input" id="order__input-cantidad${index}" type="number" value="${producto.cant}" onchange="cantidadProducto('${index}')">
                    <button class="product__action-btn" onclick="AumentarProducto('${index}')">+</button>
                </div> 
            </td>
            <td  class="product__price">
                $ ${producto.total}
            </td>
            <td >
                <button class="product__action-btn" onclick="deleteProduct(${index})">
                    <i class="fa-solid fa-x"></i>
                </button>
            </td>
        </tr>`;
        tbody.innerHTML += tableRow;
        totalOrden += producto.total;
    });

    const tableRow = `
    <tr>
        <td class="product__price order-total" colspan="4">
            Total
        </td>
        <td class="product__price order-total">
            $${totalOrden}
        </td>
    </tr>`;
    tbody.innerHTML += tableRow;
}

renderizarTabla();
cargarOrdenes();

function AumentarProducto(id) {
const input = document.getElementById(`order__input-cantidad${id}`)
const value = parseInt(input.value, 10);
input.value = isNaN(value) ? 1 : value + 1;
cantidadProducto(id);
}

function DisminuirProducto(id) {
    console.log('DisminuirProducto:', id);
    var input = document.getElementById(`order__input-cantidad${id}`)
    var value = parseInt(input.value, 10);
    input.value = isNaN(value) ? 1 : value - 1;
    if (input.value < 1) {
        input.value = 1;
    }
    cantidadProducto(id);
} 

function cantidadProducto(id) {
    console.log('cantidadProducto:', id);
    const cantidadProducto = document.getElementById(`order__input-cantidad${id}`);
    order[id].cantidad = parseInt(cantidadProducto.value, 8);
    order[id].total = order[id].cantidad * parseInt(order[id].price, 8);
    localStorage.setItem('order', JSON.stringify(order));
    renderizarTabla();
    contador();
}

function RealizarCompra() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        console.log('Requiere inicio de sesión!!');
        Swal.fire(
            'Requiere inicio de sesión!!',
            '',
            'error'
        );
    } else {
        if (products.length === 0) {
            showAlert('Debe tener productos en su carrito para poder concretar', 'success');
            Swal.fire(
                'Problemas!!',   
                'Debe tener productos en su carrito para poder concretar.',
                'warning'
            );
        } else {
            localStorage.removeItem('order');
            products = [];
            renderizarTabla();
            Swal.fire(
            'Enhorabuena, compra realizada!',
            '',
            'success'
        );

            contador();
        }
    }
}
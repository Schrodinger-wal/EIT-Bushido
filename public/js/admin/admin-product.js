let products = [];
const token = localStorage.getItem('token')

let selectCategoryHTML = document.getElementById('category');

let editIndex;

const productForm = document.getElementById('form-product');
const submitbtn = document.getElementById('btnProduct');
const tableBody = document.getElementById('tableBody')


/* ===============================TABLA================================== */

/* ============CARGA DE PRODUCTOS Y CATEGORIAS======== */

async function cargarCategorias() {
    try {

        const response = await axios.get(`${URL}/category`)
        const categories = response.data.categories
        selectCategoryHTML.innerHTML = '<option value="" selected></option>';
        categories.forEach((cat) => {
            selectCategoryHTML.innerHTML += `<option value="${cat._id}">${cat.name}</option>`
            console.log(response.data.categories);
        })
    } catch (error) {
        console.log(error)
    }
}

cargarCategorias()


async function cargarProductos() {
    try {
        const respuesta = await axios.get(`${URL}/products`)


        products = respuesta.data.productos
        console.log(respuesta.data.products)
        renderizarTabla(products)
    } catch (error) {
        console.warn(error)
    }
}

cargarProductos();

/* =======RENDERIZACION */

function renderizarTabla(products) {
    tableBody.innerHTML = "";

    if (products.length === 0) {
        tableBody.innerHTML = `<tr> <td colspan= "6">No se 
        encontraron productos</td> </tr>`
        return;
    }

    
    products.forEach((producto) => {
        
        let imageSrc = producto.image ? `/upload/product/${producto.image}` : `Assets/page-notifier/not-found.png`
        

        const tableRow =
            `<tr class="product">
        <td class="product__img-cell">
            <img class= "product__img" 
            src="${imageSrc}">                    
        </td>
        <td class= "product__name">
            ${producto.name}
        </td>
        <td class= "product__desc">
            ${producto.description}    
        </td>
        <td class= "product__price">
            $${producto.price}
        </td>
        <td class= "product__actions">
            <button class="product__action-btn" onclick="deleteProduct('${producto._id}')"> 
                <i class="fa-solid fa-trash-can"></i>
            </button>
            <button class="product__action-btn btn-edit" onclick="editProduct('${producto._id}')">
                <i class="fa-solid fa-pencil"></i>
            </button>
        </td>

        </tr>`
        tableBody.innerHTML += tableRow
    });
}

/*============AGREGAR UN PRODUCTO============= */

async function addProduct(evt) {
    evt.preventDefault();

    const elements = evt.target.elements;
    const formFile = new FormData(evt.target);

    const newProduct = {
        name: elements.name.value,
        description: elements.description.value,
        price: elements.price.value,
        category: elements.category.value,
        image: elements.image.value,
    };

    const token = localStorage.getItem('token');

    try {
        if (editIndex) {
            const response = await axios.put(`${URL}/products/${editIndex}`, newProduct, {
                headers: {
                    Authorization: token,
                },
            });

            if (response.data.success) {
                showAlert('El producto se editó correctamente', 'success');
            } else {
                console.log(error)
                showAlert('No se pudo modificar el producto', 'warning');
            }
        } else {

            const response = await axios.post(`${URL}/products`, newProduct)

            if (response.data.success) {
                Swal.fire(
                    'El producto no pudo ser añadido!',
                    '',
                    'error'
                );
            } else {
                Swal.fire(
                    'El producto se agrego con exito!',
                    '',
                    'success'
                );
            }
        }

        editIndex = undefined;
        submitbtn.classList.remove('edit-btn');
        submitbtn.innerText = 'Cargar producto';
        evt.target.reset();
        elements.name.focus();

        cargarProductos();
        limpiar();
    } catch (error) {
        Swal.fire(
            'Ha ocurrido un error',
            '',
            'error'
            );
        console.log(error);
        console.log(error.response);
    }
}

/* ===============================Reiniciar====================== */


function limpiar() {
    const el = productForm.elements;

    el.name.value = '';
    el.description.value = '';
    el.price.value = '';
    el.category.value = '';
}


/* ===========================DELETE=============================== */


async function deleteProduct(id) {
    const confirmation = await Swal.fire({
        title: '¿Estás seguro?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrarlo',
    });

    if (confirmation.isConfirmed) {
        try {
            const response = await axios.delete(`${URL}/products/${id}`, {
                headers: { Authorization: token }
                }) ;
            Swal.fire(
                'El producto ha sido borrado correctamente.',
                '',
                'success',
            );
            cargarProductos();
        } catch (error) {
            Swal.fire(
                'Error al borrar productos',
                '',
                'error',
            );
            console.log(error);
        }
        renderizarTabla();
    }
}


/* ================================EDIT=========================== */


async function editProduct(id) {
    submitbtn.classList.add("edit-btn");
    submitbtn.innerText = "Modificar producto";

    

    try {
        const response = await axios.get(`${URL}/products/${id}`, {
            headers: {
                Authorization: token
            }
        });

        const product = response.data.producto;
        const { name, description, price, image, category } = product;
        const elements = productForm.elements;

        elements.name.value = product.name;
        elements.description.value = product.description;
        elements.price.value = product.price;
        elements.image.value = product.image;
        elements.category.value = product.category;

        editIndex = id;
    } catch (error) {
        showAlert('Error al obtener los datos del producto', 'error');
        console.log(error);
    }
}

async function editProduct() {
    const elements = productForm.elements;
    const updatedProduct = {
        name: elements.name.value,
        description: elements.description.value,
        price: elements.price.value,
        image: elements.image.value,
        category: elements.category.value
    };

    try {
        const response = await axios.put(`${URL}/products/${editIndex}`, updatedProduct, {
            headers: {
                Authorization: token
            }
        });

        if (response.data.success) {
            showAlert('El producto se editó correctamente', 'success');
        } else {
            showAlert('No se pudo modificar el producto', 'warning');
        }

        editIndex = undefined;
        submitbtn.classList.remove('edit-btn');
        submitbtn.innerText = 'Cargar producto';
        productForm.reset();
        elements.name.focus();

        cargarProductos();
        limpiar();
    } catch (error) {
        showAlert('Ha ocurrido un error al actualizar el producto', 'error');
        console.log(error);
    }
} 


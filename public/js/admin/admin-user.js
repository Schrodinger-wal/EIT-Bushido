let users = [];

const userForm = document.getElementById('form-user');
const userBtn = document.getElementById('userBtn');
/* /////////////////////////////////////////////// */
let password1 = document.getElementById('password1');
let password2 = document.getElementById('password2');
/* /////////////////////////////////////////////// */
const passForm = document.querySelectorAll('.password-form');
const submitBtn = document.querySelector('userBtn');
const tableBody = document.getElementById('table-body');

let editIndex = undefined;

/* ===============Carga de usuarios=============== */

async function cargarUsuarios() {
try {
  const respuesta =  await axios.get(`${URL}/users`)
  users = respuesta.data.users
  renderizarTabla(users)
  
} catch (error) {
  console.log(error)
}
}

/* ===============Renderizacion===================*/

console.log(users)
function renderizarTabla(users) {
    tableBody.innerHTML = "";
  
    if (users.length === 0) {
      tableBody.innerHTML = `<tr class="disabled"> <td colspan="6">No se encontraron usuarios</td> </tr>`;
      return;
    }

    
    users.forEach((user) => {
      let imageSrc = user.image ? user.image : '/assets/page-notifier/not-found.png'
      const tableRow = `
        <tr class="product">
          <td class="product__img-cell">
            <img class= "product__img" 
            src="${imageSrc}" alt:"${user.name}">                    
          </td>
          <td class="product__name">
            ${user.name}
          </td>
          <td class="product__desc">
            ${user.email}    
          </td>
          <td class="product__price">
            ${user.role}
          </td>
          <td class="product__gender">
          ${user.gender || "-"}
          </td>
          <td class="product__price">
            ${formatDate(user.createdAt)}
          </td>
          <td class="product__actions">
            <button class="product__action-btn" onclick="deleteUser('${user._id}')"> 
              <i class="fa-solid fa-trash-can"></i>
            </button>
            <button class="product__action-btn btn-edit" onclick="editUser('${user._id}')">
              <i class="fa-solid fa-pencil"></i>
            </button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += tableRow;
    });
  }
  
  // Función para formatear la fecha en el formato deseado
  function formatDate(date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate.replace(/\//g, "/");
  }
  
  // Llama a la función cargarUsuarios() para obtener los datos
  cargarUsuarios();



function formatearFecha() {

    const fecha = new Date()

let dia = String(fecha.getDate())
let mes = fecha.getMonth() + 1

const year = fecha.getFullYear()

if(dia < 10) {
    dia = '0' + dia;
}


    return `${dia}/${mes}/${year}`;
}

/* ==================================== ADD =================== */

async function addUser(evt) {
  evt.preventDefault();

  const elements = evt.target.elements;

  const newUser = {
      name: elements.name.value,
      email: elements.email.value,
      password: elements.password1.value,
      role: elements.role.value,
  };

  const token = localStorage.getItem('token');

  try {
      if (editIndex) {
          const response = await axios.put(`${URL}/users/${editIndex}`, newUser, {
              headers: {
                  Authorization: token,
              },
          });

          if (response.data.success) {
            Swal.fire(
              'El usuario se edito con exito!',
              '',
              'success'
            );
              passForm.forEach((form) => {
                  form.style.display = 'block';
              });
              password1.required = true;
              password2.required = true;
          } else {
            Swal.fire(
              'No se pudo editar el usuario!',
              '',
              'Error'
            );
          }
      } else {
        const response = await axios.post(`${URL}/users`, newUser);

          if (response.data.success) {
            Swal.fire(
              'El usuario no pudo ser añadido!',
              '',
              'error'
            );
          } else {
            Swal.fire(
              'El usuario ha sido agregado!',
              '',
              'success'
            );
          }
      }

      editIndex = undefined;
      userBtn.classList.remove('edit-btn');
      userBtn.innerText = 'Cargar usuario';
      evt.target.reset();
      elements.name.focus();

      cargarUsuarios();
      limpiar();
  } catch (error) {
    Swal.fire(
      'El usuario ha sido agregado!',
      '',
      'error'
    );
      console.log(error);
  }
}

/* ===============================REINICIAR====================== */


function limpiar(){
    const el = userForm.elements;
    
    el.name.value = '';
    el.email.value = '';
    el.gender.value = '';
    el.role.value = 'USER_ROLE';
    el.password1.value = '';
    el.password2.value = ''; 
}
/* ===============================DELETE====================== */

async function deleteUser(id) {
  const confirmation = await Swal.fire({
    title: '¿Estás seguro?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, borrarlo'
  });

  if (confirmation.isConfirmed) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${URL}/users/${id}`, {
        headers: { Authorization: token }
      });
      Swal.fire(
        'El user ha sido borrado.',
        '',
        'success'
      );
      cargarUsuarios();
    } catch (error) {
      Swal.fire(
        'Error al borrar el user',
        '',
        'alert'
      );
      console.log(error);
    }
    renderizarTabla();
  }
}
/* =======================EDIT======================= */


async function editUser(id) {
  console.log(id)
    try {
      const submitBtn = document.querySelector('userBtn');
      submitBtn.classList.add("edit-btn");
      submitbtn.innerText = "Modificar producto";

        const token = localStorage.getItem('token');
        response = await axios.get(`${URL}/users/${id}`);

        const user = response.data.user;

        const el = userForm.elements;

        console.log(el)
        
        el.name.value = user.name;
        el.email.value = user.email;
        password1.required = false;
        el.date.value = formatearFecha(user.date)
        el.gender.value = user.gender
        el.role.value = user.role;
        editIndex = id;
    } catch (error) {
        console.log(error)
    }
}


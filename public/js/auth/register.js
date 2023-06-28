const registerForm = document.querySelector('#registerForm');
const registerBtn = document.getElementById ('registerSubmit');

/* Se escucha y ejecuta la funcion register */

registerForm.addEventListener ("submit", async (event) => {


try {
    event.preventDefault();

    const element = event.target.elements;
    const user = {
        name: element.fullName.value,
        email: element.email.value,
        password: element.password1.value,
        age: element.age.valueAsNumber,
        date: element.born.valueAsNumber,
        genre: element.genre.value,
        country: element.country.value,
        role: 'USER_ROLE',
    }

    const response = await axios.post(`${URL}/users`, user)
    Users = response.data.user; 

    console.log(`Usuario agregado`)
    Swal.fire(
        'Registro correcto!',
        '',
        'success'
    );

    setTimeout(() => {
        window.location.href = "/login";
    }, 1500)
} catch (error) {
    console.log(error)
}
        console.log(event)
});

//!!!!!!! INCORPORAR SWEET ALERT CUANDO EL MAIL YA EXISTE Y CUANDO EL USUSARIO ES CREADOVICH

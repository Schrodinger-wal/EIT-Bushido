const loginForm = document.getElementById('loginForm')

console.log(loginForm);
console.log("Evento de envío del formulario agregado")

/* Se escucha y ejecuta la funcion login */

loginForm.addEventListener('submit',async (event) => {
    event.preventDefault();

    const {email, password} = loginForm.elements;

    try {
        const dataBody = {
            email: email.value,
            password: password.value
        }
        console.log(dataBody)
        const respuesta = await axios.post(`${URL}/login`, dataBody)

        const {token, user, msg} = respuesta.data;

        console.log(respuesta.data)
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user))
    
        console.log(user)

        Swal.fire(
            '¡Login correcto!',
            '',
            'success'
        );

        setTimeout(() => {
            window.location.href = "/";
        }, 1500)
    } catch (error) {
        console.log(error)
        console.log(error.response)
        Swal.fire(
            '¡Datos incorrectos!',
            '',
            'error'
        );
    }
});

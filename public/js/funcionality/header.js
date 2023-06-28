const signIn = document.getElementById ('navbar__sign-in');
const navbarList = document.getElementById('navbar-list');


function renderHeaderLinks() {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser) {
        signIn.innerHTML = `<div onclick='logout()' " href="/login" style="cursor: pointer;" class="navbar__nav-link">Logout</div>`



    if (currentUser.role === 'ADMIN_ROLE') {


    const adminProductLink = createListItemElement('admin-product', 'Admin Product')
    const adminUserLink = createListItemElement('admin-user', 'Admin User');



    navbarList.appendChild(adminProductLink);
    navbarList.appendChild(adminUserLink);
}

}
else {

    const link = createLinkElement('login', 'Login') // le estariamos mandando el path y el text a la funcion
    signIn.replaceChildren(link);

    signIn.innerHTML = `<a href="/login" id="sign-in" class="navbar__nav-link">Login</a>`
    }
}


/* Funciones */


// usamos para los admin pages
function createListItemElement(path, text) {
    const listItem = document.createElement('li');
    listItem.classList.add('navbar__nav-item');
    listItem.setAttribute('id', path) // el valor id es el valor del path y se lo asigno para despues removerlos en el logout
    link = createLinkElement(path, text);

    listItem.appendChild(link)

    return listItem
}


// usamos para el login
function createLinkElement (path, text) {
    const link = document.createElement('a'); /* creamos el link */
    link.classList.add('navbar__nav-link'); // le ponemos el estilo con la class
    link.href = `${path}`; // le damos una pagina en especifica a buscar
    link.innerText = text; //escribe el texto que aparecera en el boton

    return link; // nos da el zelda 
}



function logout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); //ojo con esto, el user tiene que quedar como un objeto y no como un json

    if(currentUser.role === 'ADMIN_ROLE') {
    document.getElementById('admin-product').remove();
    document.getElementById('admin-user').remove()

    Swal.fire(
        '¡Moviendonos a la pagina principal!',
        "",
        'success'
    );
    setTimeout(()=>{
        window.location.href="/"
    }, 800)
    }

    localStorage.removeItem('currentUser');
    localStorage.removeItem('token')

    renderHeaderLinks();
}


renderHeaderLinks();

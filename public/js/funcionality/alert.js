function showAlert(text, type = 'sucess') { 


    const alertDialog = document.createElement('div')
    // Añade una clase
    alertDialog.classList.add('alert-dialog')
    alertDialog.innerText = text;

    document.body.appendChild(alertDialog);

    if(type === 'sucess') {
        alertDialog.style.backgroundColor= 'green'
    }

    if(type === 'error'){
        alertDialog.style.backgroundColor= 'red'
    }

    if(type === 'warning'){
        alertDialog.style.backgroundColor= 'orange'
    }

    alertDialog.innerText = text;       

    document.querySelector('body').appendChild(alertDialog)


    setTimeout(() => alertDialog.classList.add('show'), 10)
    
    setTimeout(()=>{      
        alertDialog.classList.remove('show'); 

        setTimeout(() => { 
            alertDialog.remove()  
        }, 1000)   
    }, 3000)
};

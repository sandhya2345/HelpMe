
let loginForm = document.querySelector('.header .login-form');

document.querySelector('#login').onclick = () => {
    loginForm.classList.toggle('active');
}

let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu').onclick = () =>{
    navbar.classList.toggle('active');

} 


window.onscroll = () =>{
    loginForm.classList.remove('active');
    navbar.classList.remove('active');

    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}

window.onload = () =>{
    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}



function toggleForm() {
        var action = document.getElementById('action').value;
        var adoptForm = document.getElementById('adoptForm');
        var donateForm = document.getElementById('donateForm');

        if (action === 'adopt') {
            adoptForm.style.display = 'block';
            donateForm.style.display = 'none';
        } else if (action === 'donate') {
            adoptForm.style.display = 'none';
            donateForm.style.display = 'block';
        }
    }

function submitForm() { 
    alert('Form submitted successfully!');
    }



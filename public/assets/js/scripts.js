/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// maskPhone.js

// Função para aplicar a máscara ao campo de telefone
function maskPhone() {
    const inputPhone = document.getElementById("phone");
    let contactPhone = inputPhone.value;

    // Remove qualquer caracter que não seja dígito
    contactPhone = contactPhone.replace(/\D/g, '');

    if (contactPhone.length <= 2) {
        inputPhone.value = `(${contactPhone}`;
    } else if (contactPhone.length <= 3) {
        inputPhone.value = `(${contactPhone}) `;
    } else if (contactPhone.length <= 7) {
        inputPhone.value = `(${contactPhone.substring(0, 2)}) ${contactPhone.substring(2)}`;
    } else if (contactPhone.length <= 11) {
        inputPhone.value = `(${contactPhone.substring(0, 2)}) ${contactPhone.substring(2, 3)} ${contactPhone.substring(3, 7)}-${contactPhone.substring(7)}`;
    } else {
        // Se tiver mais de 11 dígitos, corta o excedente
        inputPhone.value = `(${contactPhone.substring(0, 2)}) ${contactPhone.substring(2, 3)} ${contactPhone.substring(3, 7)}-${contactPhone.substring(7, 11)}`;
    }
}

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function () {
    const inputPhone = document.getElementById("phone");

    // Aplica a máscara quando o usuário digita no campo
    inputPhone.addEventListener('keyup', maskPhone);
});

//Validação do envio do formulário de mensagens
document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = event.target;

    // Reset validation states
    Array.from(form.elements).forEach(input => {
        input.classList.remove('is-invalid');
    });

    // Check validity and show invalid feedback if needed
    if (!form.checkValidity()) {
        Array.from(form.elements).forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
            }
        });
        return;
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, message })
        });

        if (response.ok) {
            document.getElementById('submitSuccessMessage').classList.remove('d-none');
            document.getElementById('submitErrorMessage').classList.add('d-none');
            setTimeout(() => {
                form.reset();
                document.getElementById('submitSuccessMessage').classList.add('d-none');
            }, 2000)
        } else {
            throw new Error('Error sending message');
        }
    } catch (error) {
        document.getElementById('submitSuccessMessage').classList.add('d-none');
        document.getElementById('submitErrorMessage').classList.remove('d-none');
    }
});
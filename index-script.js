window.addEventListener('DOMContentLoaded', () =>{

    // NAVBAR FADE OUT EFFECT 
    window.addEventListener('scroll', () => {
        let navbar = document.querySelector('.navbar');
        let scrollPosition = window.scrollY;
        if(scrollPosition > 0){
            navbar.classList.add('sticky');
        }else{
            navbar.classList.remove('sticky');
        }
    });


    // email POPUP
    let emailPopup = document.querySelector('.email-popup');
    let btn = document.querySelector('.email-btn');
    let btnClose = document.querySelector('.email-popup-close-btn');

    btn.onclick = function(){
        emailPopup.style.display = 'block';
    }
    btnClose.onclick = function(){
        emailPopup.style.display = 'none';
        
    }

});
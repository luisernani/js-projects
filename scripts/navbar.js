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

});
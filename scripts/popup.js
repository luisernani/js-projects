window.addEventListener('DOMContentLoaded', ()=> {
    const emailPopup = document.querySelector('.email-popup');
    const emailBtn = document.querySelectorAll('.email-btn');
    const emailBtnClose = document.querySelector('.email-popup-close-btn');

    function showPopup(){
        emailPopup.style.display = 'block';
    }
    function closePopup(){
        emailPopup.style.display = 'none'
    }
    emailBtn.forEach(btn => btn.addEventListener('click', showPopup));
    emailBtnClose.addEventListener('click', closePopup);

});


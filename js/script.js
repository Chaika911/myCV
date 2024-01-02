let contactBtn = document.querySelector('#contacts');
let social = document.querySelector('#social');
let close = document.querySelector('#close');

contactBtn.addEventListener('click', viewSocial);
function viewSocial(){
    social.style.left = '10px';
    contactBtn.style.visibility = 'hidden';
}
close.addEventListener('click', function() {
    social.style.left = '-150%';
    contactBtn.style.visibility = 'visible';

})

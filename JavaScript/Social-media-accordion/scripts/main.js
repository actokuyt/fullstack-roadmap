// variable declarations

let socialIcons = document.querySelectorAll('.social');
let tab = document.querySelectorAll('.tab');
let count;

// functions

tab[0].addEventListener('mouseover', function(){
    tab[0].classList.add('youtube');
});

tab[0].addEventListener('mouseout', function(){
    tab[0].classList.remove('youtube');
});

tab[1].addEventListener('mouseover', function(){
    tab[1].classList.add('facebook');
});

tab[1].addEventListener('mouseout', function(){
    tab[1].classList.remove('facebook');
});

tab[2].addEventListener('mouseover', function(){
    tab[2].classList.add('instagram');
});

tab[2].addEventListener('mouseout', function(){
    tab[2].classList.remove('instagram');
});

tab[3].addEventListener('mouseover', function(){
    tab[3].classList.add('whatsapp');
});

tab[3].addEventListener('mouseout', function(){
    tab[3].classList.remove('whatsapp');
});

tab[4].addEventListener('mouseover', function(){
    tab[4].classList.add('github');
});

tab[4].addEventListener('mouseout', function(){
    tab[4].classList.remove('github');
});

tab[5].addEventListener('mouseover', function(){
    tab[5].classList.add('gmail');
});

tab[5].addEventListener('mouseout', function(){
    tab[5].classList.remove('gmail');
});
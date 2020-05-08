//DOM Document Object Module
//window object
console.log(window);
//alert(2);  //or window.alert()    since window obj is the parent object of the browser,its properties and methods can be accessed without the dot(.) operator. 

//Single Element
console.log(document.getElementById('my-form'));
console.log(document.querySelector('h1')); //can select ant tag, id ,class but is single element(one at a time). ~jQuery


//Multiple Elements
console.log(document.querySelectorAll('.item')); //return nodelist..can run run array methods on it.

//Html manipulation
// const ul = document.querySelector('.items');
// ul.firstElementChild.textContent = 'Hello';  //renames items 1
// ul.children[1].innerText = 'Rohith';  //same as textContent
// ul.lastElementChild.innerHTML = '<h2>Hai Again</h2>';

//CSS manipulation
// const button = document.querySelector('.btn');
// button.style.background = 'red';
// button.addEventListener('click', e =>{
//     e.preventDefault();    //default behaviour of submit is to submit.Preventing default behaviour to illustrate eg. 
//     console.log(e.target);   looking at event object e
//     console.log(e.target.classname);
//     document.querySelector('#my-form').style.background = '#ccc';
//     document.querySelector('.items').lastElementChild.innerHTML = '<h2>Clicked!</h2>'
// })

const myForm = document.querySelector('#my-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');


myForm.addEventListener('submit', onSubmit); //since in myForm we can use submit instead of click
function onSubmit (e){
    e.preventDefault();
    if(name.value === '' || email.value === ''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 2000);
    }else{
        const li = document.createElement('li');  //creates list
        li.appendChild(document.createTextNode(`${name.value} : ${email.value}`)); //appends value to list
        userList.appendChild(li);  //appends li to ul tag
    
    //Clear fields    
    name.value = '';
    email.value = '';
    }
     
}
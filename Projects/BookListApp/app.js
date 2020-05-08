//Item class: Represents a class for item in the supermarket
class Item {
    constructor(name, itemcode, price) {
        this.name = name;
        this.itemcode = itemcode;
        this.price = price;
    }
}

//UI Class: Handles UI Tasks
class UI {                                               //methods are static so that need not be instatantiated
    static displayItem() {
        // const StoredItems = [
        //     {                                            //mimics localStorage
        //         name: 'Wheat',
        //         itemcode: 8796,
        //         price: 45
        //     },
        //     {
        //         name: 'Salt',
        //         itemcode: 9796,
        //         price: 10
        //     }
        // ];
        const items = Store.getItems();                      //displays utems on localStorage
        items.forEach((item => UI.addItemtoList(item)));   //select each property from userinput and add them to table
    }
    static addItemtoList(item){
        const list = document.querySelector('#itemList');  //grabs to tbody of id itemList
        const row = document.createElement('tr');          //creates a tr tag
        row.innerHTML = `                                  
        <td>${item.name}</td>
        <td>${item.itemcode}</td>
        <td>${item.price}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;                                                  //adding data to row variable
        list.appendChild(row);                              //append data to list ie to the table
    }

    static showAlert(message, className){
        // <div class="alert alert-danger(or success)">Message</div>   --the way the following is formated
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#cart-form');
        container.insertBefore(div, form);                 //adds div before form

        //vanish after 3 sec
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    
    static clearFields(){
        document.querySelector('#ItemName').value = '';
        document.querySelector('#ItemCode').value = '';
        document.querySelector('#ItemPrice').value = '';
    }

    static deleteItem(el){
        if(el.classList.contains('delete')){                 //checks whether class name contains delete
           el.parentElement.parentElement.remove();          // 1st parentElement only denotes <td>, ie the button 2nd parentlist denotes the entire row         
        }                
    }
}   

//Store Class: Handles Storage
//localStorage only accept key('item') value pair of strings. Thus should be parsed to JSON when retrieving and viceversa
class Store{
    static getItems(){
        let items;
        if(localStorage.getItem('items') === null){
            items = [];
        } else {
            items = JSON.parse(localStorage.getItem('items'));
        }

        return items;
    }

    static addItem(item){
        const items = Store.getItems();
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        
    }
    static removeItem(itemcode){
        const items = Store.getItems();
        items.forEach((item, index) => {
            if(item.itemcode === itemcode){
                items.splice(index, 1);                         //remove 1 element from index of array items
            }
        });
        // console.log(itemcode);
        // console.log(items);
        localStorage.setItem('items', JSON.stringify(items));  //adding updated string to localStorage
    }
}

//Event: Display a items.
document.addEventListener('DOMContentLoaded', UI.displayItem)

//Event:Add a item.
document.querySelector('#cart-form').addEventListener('submit',(e) => { 

    //Prevent default behaviour
    e.preventDefault();
    
    //Get form values
    const itemname = document.querySelector('#ItemName').value;
    const itemCode = document.querySelector('#ItemCode').value;
    const itemPrice = document.querySelector('#ItemPrice').value;

    //Validate
    if(itemname === '' || itemCode === '' || itemPrice === ''){
        UI.showAlert('Please fill all the fields', 'danger');
    }
    else{
        //instiante class item
    const item = new Item(itemname, itemCode, itemPrice);

        //Add item to UI
        UI.addItemtoList(item);

        //Add item to store
        Store.addItem(item);
        //success message
        UI.showAlert('Item Added!', 'success');
        //Clear the fields
        UI.clearFields();

    }
    
})

//Event: Remove a item
document.querySelector('#itemList').addEventListener('click', (e) => {   //event propogation
e.preventDefault();
//selects the parentlist(itemList) because simply selecting the button with delete class would remove the 1st element always
//removes item from UI
UI.deleteItem(e.target)   //targets on the item in the list that is clicked

//removes item from store
Store.removeItem(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);    
UI.showAlert('Item Removed', 'info');
})
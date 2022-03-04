//SELECT ITEMS 
const alert=document.querySelector('.alert');
const form=document.querySelector('.grocery-form');
const grocery=document.getElementById('grocery');
const submitBtn=document.querySelector('.submit-btn');
const container=document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag=false;
let editID="";
//  EVENT LISTENERS 
form.addEventListener('submit',addItem);
// clear items
clearBtn.addEventListener('click',clearItems);



// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag){//truthy value ne editujem
        createListItem(id,value);
        displayAlert('Dodato!','success');
        container.classList.add('show-container');
        addToLocalStorage(id,value);
        setBackToDefault();

    }else if(value && editFlag){//truthy value editujem
        editElement.innerHTML=value;
        displayAlert('Promenjeno!','success');
        // 
        editLocalStorage(editID,value);
        setBackToDefault();


    }else {//falsey value
        displayAlert("Unesite vrednost", "danger");
    }


}

// display alert
function displayAlert(text,action){
    alert.textContent=text;
    alert.classList.add(`alert-${action}`);

    // remove alert
    setTimeout(function(){
        alert.textContent='';
        alert.classList.remove(`alert-${action}`);
    },1000);

}

// edit func
function editItem(e){
    const element= e.currentTarget.parentElement.parentElement;
    // set edititem
    editElement=e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value=editElement.innerHTML;
    editFlag=true;
    editID=element.dataset.id;
    submitBtn.textContent="edit";




}
// delete func
function deleteItem(e){
    const element= e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length===0){
        container.classList.remove('show-container');
    }
    displayAlert('Uklonjeno.','danger');
    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);

}
// set back to default
function setBackToDefault(){
    grocery.value='';
    editFlag=false;
    editID='';
    submitBtn.textContent="submit";
}

// clearlist
function clearItems(){
    const items=document.querySelectorAll('.grocery-item');
    if(items.length>0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert('Prazna lista!','danger');
    setBackToDefault();
    localStorage.removeItem('list');
}

// LOCAL STORAGE 

function addToLocalStorage(id,value){
    const grocery = {id,value};
    let items= getLocalStorage();

    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items));


}

function removeFromLocalStorage(id){
    let items = getLocalStorage();

    items=items.filter(function (item){
        if(item.id !==id) {
            return item;
        }
    })
    localStorage.setItem('list',JSON.stringify(items));

}

function editLocalStorage(id,value){
    let items=getLocalStorage();
    items=items.map(function(item){
        if(item.id===id){
            item.value=value;

        }
        return item;
    })
    localStorage.setItem('list',JSON.stringify(items));

}

function getLocalStorage(){
  return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
}

// SETUP ITEMS 

function setupItems(){
    let items=getLocalStorage();
    if(items.length>0){
items.forEach(function(item){
    createListItem(item.id,item.value);
})
container.classList.add('show-container');
    }
}

function createListItem(id,value){
    const element = document.createElement('article');
    element.classList.add('grocery-item');
    // add id
    const attr=document.createAttribute('data-id');
    attr.value=id;
    element.setAttributeNode(attr);
    element.innerHTML=`<p class="title">${value}</p>
        <div class="btn-container">
            <button class="edit-btn" type="button">
            <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn" type="button">
            <i class="fas fa-trash"></i>
            </button>
        </div>`;
        const deleteBtn=element.querySelector('.delete-btn');
        const editBtn=element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener('click',editItem);
        list.appendChild(element);

}

//! Gerekli HTML elementlerini seç
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const alert = document.querySelector('.alert');
const submitBtn = document.querySelector('.submit-btn');
const clearBtn = document.querySelector('.clear-btn');

//* Düzenleme Seçenekleri
let editElement;
let editFlag = false; // Düzenleme modunda olup olmadığını belirtir.
let editID = ''; // Düzenleme yapılan ögenin benzersiz kimliği

//Fonksiyonlar

const setBackToDefault = () =>{
  grocery.value = ""
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'Add';
}

const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 2000);
};

// Tikladiginiz article etiketini ekrandan kaldiracak fonksiyon
const deleteItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement; // article etiketine eristik.
  const id = element.dataset.id;
  list.removeChild(element); // list etiketi icerisinden article etiketini kaldirdik.
  displayAlert('Note deleted successfully', 'danger');
  setBackToDefault();
};

const editItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement; // article etiketine, parentElement kullanarak eristik.
  editElement = e.currentTarget.parentElement.previousElementSibling; // butonun kapsayicisina eristikten sonra kapsayicinin kardes elementine eristik.
  // tikladigim article etiketi icerisindeki p etiketinin textini, inputun icerisine gonder
  grocery.value = editElement.innerText;
  editFlag = true; // duzenleme modu
  editID  = element.dataset.id; // duzenlenen ogenin Id'sine eristik ve globaldeki editID'ye esitledik.
  submitBtn.textContent = 'Edit'; // butonun textini duzenle olarak degistirdik.

};

const addItem = (e) => {
  e.preventDefault(); // formun otomaik olarak gonderilmesini engeller
  const value = grocery.value; // form icerisinde bulunan inputun degerini aldik.
  const id = new Date().getTime().toString(); // benzersiz bir id olusturduk.

  // Eger input bos degilse ve duzenleme modunda degilse calisacak blog yapisi
  if (value !== '' && !editFlag) {
    const element = document.createElement('article'); // Yeni bir article etiketi olusturduk
    let attr = document.createAttribute('data-id'); // article etiketine data-id attribute'u olusturduk. Yeni bir veri kimligi olusturduk.
    attr.value = id; // attribute'un degerini id'ye esitledik
    element.setAttributeNode(attr); // article etiketine data-id attribute'u setledik ekledik.
    element.classList.add('grocery-item'); // article etiketine class ekledik.

    element.innerHTML = `
        
        <p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
        `;

    const deleteBtn = element.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', deleteItem);
    const editBtn = element.querySelector('.edit-btn');
    editBtn.addEventListener('click', editItem);
    list.appendChild(element); // list'e article etiketini ekledik.
    displayAlert('Note added successfully', 'success');
    container.classList.add('show-container');
    //local storage'a ekeleme yapildi
    addToLocalStorage(id,value)
    // degerler varsayilana cevrildi
    setBackToDefault()
  }else if(value !== "" && editFlag){
    // degistirecegimiz p etiketinin icerik kismina kullanicinin girdigi degeri gonderdik
    editElement.innerText = value;
    // alert yapisini bastirdik
    displayAlert('Note edited successfully', 'success');
    setBackToDefault();
  }
};

const clearItems = () =>{
  const items = document.querySelectorAll(".grocery-item");
  // listede oge varsaa calsiir
  if(items.length > 0 ){
    items.forEach((item) => list.removeChild(item));
  }
  // container yapisini gizle
  container.classList.remove("show-container")
  displayAlert("List is empty","danger")
  setBackToDefault()
}

const createListItem = (id, value) =>{
    const element = document.createElement('article'); // Yeni bir article etiketi olusturduk
    let attr = document.createAttribute('data-id'); // article etiketine data-id attribute'u olusturduk. Yeni bir veri kimligi olusturduk.
    attr.value = id; // attribute'un degerini id'ye esitledik
    element.setAttributeNode(attr); // article etiketine data-id attribute'u setledik ekledik.
    element.classList.add('grocery-item'); // article etiketine class ekledik.

    element.innerHTML = `
        
        <p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
        `;

    const deleteBtn = element.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', deleteItem);
    const editBtn = element.querySelector('.edit-btn');
    editBtn.addEventListener('click', editItem);
    list.appendChild(element); // list'e article etiketini ekledik.
    displayAlert('Note added successfully', 'success');
    container.classList.add('show-container');
  
}

const setUpItems = () =>{
  let items = getLocalStorage()
  if(items.length > 0){
    items.forEach((item) =>{
      createListItem(item.id,item.value)
    })
  }
}

// Olay Izleyicileri
form.addEventListener('submit', addItem);
clearBtn.addEventListener("click",clearItems)
window.addEventListener("DOMContentLoaded",setUpItems)

/* ------------------ LOCAL STORAGE --------------------------- */

// yerel depoya oge ekleme islemi
const addToLocalStorage = (id,value) =>{
  const grocery = {id,value};
  let items= getLocalStorage()
  items.push(grocery)
  console.log(items)
  localStorage.setItem("list",JSON.stringify(items))
};

// yerel depodan oge alma islemi
const getLocalStorage = () =>{
  return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];

}

//! Gerekli HTML elementlerini seç
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

//* Düzenleme Seçenekleri
let editElement;
let editFlag = false; // Düzenleme modunda olup olmadığını belirtir.
let editID = ""; // Düzenleme yapılan ögenin benzersiz kimliği

//Fonksiyonlar 

const displayAlert = (text,action) =>{
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(()=>{
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`)
    },2000)
}

const addItem = (e) =>{
    e.preventDefault(); // formun otomaik olarak gonderilmesini engeller
    const value = grocery.value; // form icerisinde bulunan inputun degerini aldik.
    const id = new Date().getTime().toString(); // benzersiz bir id olusturduk.
    
    // Eger input bos degilse ve duzenleme modunda degilse calisacak blog yapisi
    if(value !== "" && !editFlag){
        const element = document.createElement("article"); // Yeni bir article etiketi olusturduk
        let attr = document.createAttribute("data-id"); // article etiketine data-id attribute'u olusturduk. Yeni bir veri kimligi olusturduk.
        attr.value = id; // attribute'un degerini id'ye esitledik
        element.setAttributeNode(attr); // article etiketine data-id attribute'u setledik ekledik.
        element.classList.add("grocery-item"); // article etiketine class ekledik.  

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
        `
        list.appendChild(element); // list'e article etiketini ekledik.
        displayAlert("Added Successfully","success")
        
    }

}

form.addEventListener("submit", addItem);
const form = document.querySelector("#form-contact"); // On recupere la valeur de ce champ via l'ID  dans une variable form
const contactInput = document.querySelector("#contact"); // On recupere la valeur de ce champ via l'ID  dans une variable contactInput
const filter = document.querySelector("#filtre");
const clearBtn = document.querySelector(".suppress");
const contactList = document.querySelector(".list-group");

loadEventListeners();

function loadEventListeners() {
  // charger le dom...

  document.addEventListener("DOMContentLoaded", getContacts);
  // Validation du formulaire

  form.addEventListener("submit", addContact);

  // clear contact list

  clearBtn.addEventListener("click", clearContacts);
  // Suppression des contacts

  contactList.addEventListener("click", removeContacts);
  // Filter contats)

  filter.addEventListener("keyup", filterContact);
}

function getContacts() {
  // Chercher les données stockées localement

  let contacts;
  if (localStorage.getItem("contacts") === null) {
    contacts = [];
  } else {
    contacts = JSON.parse(localStorage.getItem("contacts"));
  }

  contacts.forEach(function (contact) {
    const li = document.createElement("li");

    li.className = "list-group-item"; // add of a class by the name of list group item to li

    li.appendChild(document.createTextNode(contact));
    contactList.appendChild(li); // Li ajouter dans la partie liste des contacts

    const link = document.createElement("a");
    link.className = "delete-item";
    link.innerHTML = '<i class="fas fa-times-circle fa-pull-right "></i>'; // On appelle le lien de FA à link

    li.appendChild(link);
    contactList.appendChild(li);
  });
}



function addContact(e) {
  if (contactInput.value === "") {
    alert("add a contact"); // Condition si le champ est vide
  }

  // Creation of the li to display the champ content

  const li = document.createElement("li");

  li.className = "list-group-item"; // add of a class by the name of list group item to li

  li.appendChild(document.createTextNode(contactInput.value));
  contactList.appendChild(li); // Li ajouter dans la partie liste des contacts

  const link = document.createElement("a");
  link.className = "delete-item";
  link.innerHTML = '<i class="fas fa-times-circle fa-pull-right "></i>'; // On appelle le lien de FA à link

  li.appendChild(link);

  contactList.appendChild(li);
  //Stocker le contact dans le local storage

  storeContactInLocalStorage(contactInput.value);

  contactInput.value = "";

  e.preventDefault();
}

// Enregistrer les valeurs dans le local storage
function storeContactInLocalStorage(contact) {
  let contacts;
  if (localStorage.getItem("contacts") === null) {
    contacts = [];
  } else {
    contacts = JSON.parse(localStorage.getItem("contacts"));
  }

  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function clearContacts() {
  /* contactList.innerHTML = ''; // Vide via le bouton la liste des contact  */
  clearContactsFromLocalStorage();
  let child = contactList.lastElementChild;
  while (child) {
    contactList.removeChild(child);
    child = contactList.lastElementChild;
  }
}

// Fonction pour supprimer les contacts du local storage

function clearContactsFromLocalStorage() {
  localStorage.clear();
}

function removeContacts(e) {
  // Fonction supprimer le contact un par un

  if (e.target.parentElement.classList.contains("delete-item")) {
    // Parent element car 2 niveaux
    if (confirm("Are you sure to delete this contact ?")) {
      e.target.parentElement.parentElement.remove();
    }
  }


  removeContactsFromLocalStorage(e.target.parentElement.parentElement);
}


function removeContactsFromLocalStorage(contactItem){

  let contacts;
    if (localStorage.getItem("contacts") === null) {
    contacts = [];
  } else {
    contacts = JSON.parse(localStorage.getItem('contacts'));
  }

    contacts.forEach(function(contact, index){
      if(contactItem.textContent === contact){
        contacts.splice(index,1);
      }
    });

    localStorage.setItem('contacts',JSON.stringify(contacts));
}




// Filtrer les contacts dans son champ de recherche

function filterContact(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".list-group-item").forEach(function (contact) {
    const item = contact.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      contact.style.display = "block";
    } else {
      contact.style.display = "none";
    }
  });
}

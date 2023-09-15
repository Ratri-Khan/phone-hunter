const loadPhones = (searchText ,dataLimit) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataLimit))
}
const displayPhones = (phones ,dataLimit) => {
    // console.log(phones)
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    const showAll = document.getElementById('show-all');
    // show all button    
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    // not found massage
    const notFound = document.getElementById('not-found');
    if (phones.length === 0) {
        notFound.classList.remove('d-none');
    }
    else {
        notFound.classList.add('d-none');
    }
    phones.map(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `        
          <div class="card p-0 m-3 border border-4 border-primary">
            <img src="${phone.image}" class="card-img-top p-4" alt="...">
            <div class="card-body text-center">
              <h3 class='p-0'>${phone.phone_name} </h3>
              <p>${phone.brand}<p>
              <button onClick="ShowMoreDetails('${phone.slug}')" type="button" class="btn bg-dark text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>            
           </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);

    })
    toggleSpinner(false);
}
const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
}
//for searching process
document.getElementById('search-button').addEventListener('click', function () {
processSearch(10);
})

// show all
document.getElementById('btn-show-all').addEventListener('click',function(){
  processSearch();
})
// enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})
//for spinner
const toggleSpinner = loader => {
    const loaderSection = document.getElementById('loader-section');
    if (loader) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
//show Details 
const ShowMoreDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}
const displayDetails = (phone) => {
    console.log(phone);
    const phoneDetailsMidalLabel = document.getElementById('phoneDetailsMidalLabel');
    const test = phoneDetailsMidalLabel.innerText = phone.name;
    console.log(test);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <div>
        <img src='${phone.image}'>
        <p>${phone.brand}</p>
        <p>Storage : ${phone.mainFeatures.storage}</p>
        <p>Memory: ${phone.mainFeatures.memory}</p>
        <p>Slug : ${phone.slug}</p>
        <p>Wlan : ${phone.others.WLAN}</p>
        <p>Bluetooth : ${phone.others.Bluetooth}</p>
        <p>ReleaseDate : ${phone.releaseDate}</p>
      </div>
    `
}

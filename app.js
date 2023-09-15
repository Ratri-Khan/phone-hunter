const loadPhones = (searchText) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhones(data.data))
}
const displayPhones = (phones) =>{
    // console.log(phones)
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // show all button
    // const showAll = document.getElementById('show-all');
    // if(phones.length > 10){
    //     phones = phones.slice(0,10);       
    //     showAll.classList.remove('hidden');
    // }
    // else{
    //     showAll.classList.add('hidden'); 
    // }
    // not found massage
    const notFound = document.getElementById('not-found');
    if(phones.length === 0){
        notFound.classList.remove('d-none');
    }
    else{
        notFound.classList.add('d-none');
    }
    phones.map(phone =>{
       
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML=`        
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
    taggleSpinner(false);
}

document.getElementById('search-button').addEventListener('click',function(){
    taggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
    

})
const taggleSpinner = loader =>{
    const loaderSection = document.getElementById('loader-section');
    if(loader){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

//show Details 
const ShowMoreDetails = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res=>res.json())
    .then(data =>displayDetails(data.data))
}
const displayDetails = (phone) =>{
    console.log(phone);
    const phoneDetailsMidalLabel = document.getElementById('phoneDetailsMidalLabel');
   const test =  phoneDetailsMidalLabel.innerText = phone.name;
   console.log(test);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <div>
        <img src='${phone.image}'>
        <p>${phone.brand}</p>
        <p>Storage : ${phone.mainFeatures.storage}</p>
        <p>Memory: ${phone.mainFeatures.memory}</p>
        <p>Slug : ${phone.slug}</p>
        <p>WLAN : ${phone.others.WLAN}</p>
        <p>Bluetooth : ${phone.others.Bluetooth}</p>
        <p>ReleaseDate : ${phone.releaseDate}</p>
      </div>
    `
    // phoneDetailsMidalLabel.appendChild(modalBody);
}

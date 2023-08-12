

const loadPhones = (searchText) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhones(data.data))
}
const displayPhones = (phones) =>{
    console.log(phones)
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // show all button
    const showAll = document.getElementById('show-all');
    if(phones.length > 10){
        phones = phones.slice(0,10);       
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden'); 
    }


    // not found massage
    const notFound = document.getElementById('not-found');
    if(phones.length === 0){
        notFound.classList.remove('hidden');
    }
    else{
        notFound.classList.add('hidden');
    }
    phones.map(phone =>{
       
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML=`
          <div class="border-2 p-5 border-fuchsia-950 bg-fuchsia-200">
             <img src="${phone.image}"/>
             <h3>${phone.phone_name} </h3>
             <p>${phone.brand}<p>
             <button onclick="ShowMoreDetails('${phone.slug}')">Details</button>
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
//for enter key 
// document.getElementById('search-field').addEventListener('keypress',function(e){
//     if(e.key === 'Enter'){
//         processSearch(10);
//     }
// })
//for spinner
const taggleSpinner = loader =>{
    const loaderSection = document.getElementById('loader-section');
    if(loader){
        loaderSection.classList.remove('hidden');
    }
    else{
        loaderSection.classList.add('hidden');
    }


}
// loadPhones();
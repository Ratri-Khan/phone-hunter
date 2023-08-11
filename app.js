
const loadPhones = () =>{
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    .then(res =>res.json())
    .then(data => displayPhones(data.data))
}

const displayPhones = (phones) =>{
    console.log(phones);
phones.forEach(phone =>{
    const phonesContainer = document.getElementById('phones-container');
    const phoneDiv  = document.createElement('div');
    // phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
    <div class="border-2 p-5 border-fuchsia-950 bg-fuchsia-200">
        <img src="${phone.image}">
        <h5 class="card-title">${phone.phone_name}</h5>           
        <button>Show Details</button>    
    </div>
    `;
    phonesContainer.appendChild(phoneDiv);
});
    
} 

loadPhones();
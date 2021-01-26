const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];


/* Format money */
const formatMoney =(number)=>{
  // return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  const options = {
    style: 'currency',
    currency: 'USD'
  }
  const formattedCurrency = Intl.NumberFormat('en-US', options).format(number)

  return formattedCurrency;
}

/* Populate data into the DOM */
const updateDOM = (resultData = data)=>{
   main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
   resultData.forEach(personInfo => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML =`<strong>${personInfo.name}</strong>${formatMoney(personInfo.money)}`;
    main.appendChild(element); 
  })
} 

/* Add objects into an array */
const addData = (dataObj)=>{
  data.push(dataObj);
  // console.log(dataObj);
  updateDOM();
}

/* Fetch random user and add money  */
const getRandomUser = async ()=>{
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();
  const user = data.results[0];
  const userInfo = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
    addData(userInfo);
}

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();


/* Double the money */
const doubleMoney = () =>{
  data = data.map(user => {
    return {...user, money:user.money * 2};
  })

  updateDOM();
}

/* Show millionare */
const showMillionare = ()=>{
  data = data.filter(user => user.money > 1000000)
  updateDOM();
}

/* Sort */
const sortByRichest = () =>{
  data.sort((low,high)=>high.money-low.money);
  updateDOM();
}

const totalWealth = () =>{
  const total = data.reduce((acc, user) => (acc + user.money),0);
  
  const element = document.createElement('div');
  element.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(element);
}

addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
showMillionairesBtn.addEventListener('click',showMillionare);
sortBtn.addEventListener('click',sortByRichest);
calculateWealthBtn.addEventListener('click',totalWealth);
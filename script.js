const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

/* Populate data into the DOM */
const updateDOM = (resultData = data)=>{
   main.innerHTML = '<h2><strong>Person</strong></h2>';
   resultData.forEach(person=>{
    const element =document.createElement('div');
    element.classList.add('person');
    element.innerHTML =`<strong>${person.name}</strong>${person.money}`;
   })
   console.log(resultData);
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




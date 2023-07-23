// Declare All ID Elements

// For User
let userName  = document.getElementById("userName");
let UserJob  = document.getElementById("UserJob");
let userPages  = document.getElementById("userPages");
let userGroups  = document.getElementById("userGroups");
let userImage  = document.getElementById("userImage");
let newUserName = document.getElementById("newUserName");
let newJob = document.getElementById("newJob");
let createUserBtn = document.getElementById("createUserBtn");
let closeModel = document.getElementById("closeModel");
// ------------------------------------------------------------------------------
// for Add Bookmark Group
let groupName  = document.getElementById("groupName");
let addGroup  = document.getElementById("addGroup");
let editGroup = document.getElementById("editGroup");
let displayGroups  = document.getElementById("displayGroups");
let tbodyGroups = document.getElementById("tbodyGroups");
// ------------------------------------------------------------------------------
// for Append URL to Group
let chooseGroup  = document.getElementById("chooseGroup");
let websiteTitle  = document.getElementById("websiteTitle");
let websiteUrl  = document.getElementById("websiteUrl");
let websiteName = document.getElementById("websiteName");
let saveUrlBtn  = document.getElementById("saveUrl");
let reset  = document.getElementById("reset");
 
// ------------------------------------------------------------------------------
// for Append URL to Group
let chooseGroupu  = document.getElementById("chooseGroupu");
let websiteTitleu  = document.getElementById("websiteTitleu");
let websiteUrlu  = document.getElementById("websiteUrlu");
let websiteNameu = document.getElementById("websiteNameu");


// ---------------------
// for Search
let searchInput = document.getElementById("search");
// ------------------------------------------------------------------------------
// for Table
let tbody = document.getElementById("tbody");
let table = document.getElementById("table");
// ------------------------------------------------------------------------------
// for another
let topUp = document.getElementById("topUp");
let statistics = document.getElementById("statistics");
let statisticsTitle = document.getElementById("statisticsTitle");
let statisticsBody = document.getElementById("statisticsBody");
let statisticsIcon = document.getElementById("statisticsIcon");
let statisticsCard = document.getElementById("statisticsCard");
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
let allDataArray = []
let userData = [];
let userSelection = false
// -------------------------------------------------------------------------------
// For Clear Elements
function clear(...elements){
    elements.forEach((elem)=>{
        elem.value = ""
    })

}
// for disable all input and buttons
function disable(status,...inputs){
    inputs.forEach((elem)=>{
        elem.disabled = status;
    })
}
// for convert first characters to uppercase
function capitalize(words){
    let result = []
    words.split(' ').forEach((elem)=>{
        result.push(elem.charAt(0).toUpperCase() + elem.substring(1))
    })
    return result.join(" ").trim()
}
// ------------------------------------------------------------------------------
// User Screen
// New User and Create Opject
function addNewUser() {
    let users = [];
    // Retrieve users from local storage
    if (localStorage.getItem("users") !== null) {
      users = JSON.parse(localStorage.getItem("users"));
    }
    // Clear the select box options
    userName.innerHTML = "";
    // Add the default option and "Add User" option
    userName.innerHTML += `
      <option selected disabled value="not">Choose User..</option>
      <option  data-bs-toggle="modal" data-bs-target="#exampleModal" value="not">Add User..</option>
    `;
    // Loop through the users and add them to the select box
    for (const user of users) {
      userName.innerHTML += `
        <option value="${user}">
          <h5>${user}</h5>
        </option>
      `;
    }
    // Add event listener for creating a new user
    createUserBtn.addEventListener("click", function() {
      const newUserName = capitalize(document.getElementById("newUserName").value.trim());
      // Validate the new user data
      if (newUserName === "") {
        alert("Please enter a valid user name");
        return;
      }
      // Add the new user to the array
      users.push(newUserName);
  
      // Clear the new user input field
      clear(newUserName);
  
      // Update the select box options
      userName.innerHTML = "";
      userName.innerHTML += `
        <option selected disabled value="not">Choose User..</option>
        <option  data-bs-toggle="modal" data-bs-target="#exampleModal" value="not">Add User..</option>
      `;
      for (const user of users) {
        userName.innerHTML += `
          <option value="${user}">
            <h5>${user}</h5>
          </option>
        `;
      }
  
      // Store the updated user array in local storage
      localStorage.setItem("users", JSON.stringify(users));
  
      if (alert("Success! User Created..")) {}
      getStatistics()
    });
  }
// Choose User and  select user information 
// check if user choosing 
function userSelected(){
    userName.addEventListener("change",function(){
        if(userName.value != "not"){
            disable(false  , chooseGroup , websiteTitle , websiteUrl , saveUrlBtn  , table)
        }else{
            disable(true,chooseGroup , websiteTitle , websiteUrl , saveUrlBtn  , table)
        }
        getStatistics()
    })
}
userSelected()
addNewUser()
// ------------------------------------------------------------------------------
// Add Bookmark Group and append to user
// -------------------------------------------------------------------------------
let user = {
    groups: [], //[id,groupName]
    content: {
      urls: {
        title: "title",
        url: "url",
        group: "group",
        websiteName: "websiteName"
      }
    }
  };
  
  function displayGroupsFun() {
    let table = '';
    user.groups.forEach((item,index) => {
      table += `<tr>
        <td>${index}</td>
        <td>${item}</td>
        <td class="d-flex justify-content-evenly ">
          <button onclick="editGroupFun(${index})" class="btn btn-info "><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteGroup(${index})" class="btn btn-danger "><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>`;
      console.log(item, " - ", index);
    });
  
    tbodyGroups.innerHTML = table;
  }
  
  addNewGroup();
  
  function deleteGroup(id) {
    if (confirm('Are You sure?') == true) {
        user.groups.splice(id, 1);
        // localStorage.Product = JSON.stringify(allDataArray);
            // Store the updated user array in local storage
            localStorage.setItem("groups", JSON.stringify(user.groups));
        displayGroupsFun();
        getStatistics()
    }

}
  function addNewGroup() {
    user.groups = []
    // Retrieve users from local storage
    if (localStorage.getItem("groups") !== null) {
        user.groups = JSON.parse(localStorage.getItem("groups"));
        displayGroupsFun()
        
    }else{
        user.groups = []
    }

    addGroup.addEventListener("click", function addNewGroupF() {
      if(groupName.value != "" && groupName.value.length > 3) {
        user.groups.push(groupName.value);
        displayGroupsFun();
        groupName.classList.remove("bg-danger", "text-white");
        addGroup.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Add Group`;
        // user.groups.push(groupName.value)
      clear(groupName);
    // Store the updated user array in local storage
        localStorage.setItem("groups", JSON.stringify(user.groups));
      addGroupsToURlSection()
      
        user.groups.forEach((elem)=>{
            chooseGroup.innerHTML +=  `<option  value="${elem.value}">${elem.value}</option>
            `
        })
      } else {
        alert("Please write a group name and make sure it's more than 3 characters.");
      }
      getStatistics()
      

    });



    







    function addGroupsToURlSection(){
        chooseGroup.innerHTML = ``
        // user.groups.forEach((elem)=>{
        //     chooseGroup.innerHTML += `<option value="${elem}">
        //     <h5>${elem}</h5>
        //     </option>`
        // })

    }

    

    
  }

//   -----------------------------
  

(function(){
            // Loop through the users and add them to the select box
            for (const group of user.groups) {
                chooseGroup.innerHTML += `
                  <option value="${group}">
                    <h5>${group}</h5>
                  </option>
                `;}


})()






//   -----------------
  function editGroupFun(id) {
    const groupName = document.getElementById('groupName');
    const addGroupButton = document.getElementById('addGroup');
    groupName.value = user.groups[id];
    groupName.classList.add('bg-danger', 'text-white');
    groupName.focus();
    addGroupButton.innerHTML = 'Update';
    addGroupButton.addEventListener('click', function updateGroup() {
      if (groupName.value) {
        const group = groupName.value;
        user.groups[id] = group; // Update the existing item in the array
        localStorage.setItem('user', JSON.stringify(user)); // Update the existing user object
        displayGroupsFun();
        clear(groupName);
        groupName.classList.remove('bg-danger', 'text-white');
        addGroupButton.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Add Group`;
        addGroupButton.removeEventListener('click', updateGroup);
      }
    });
  }

  

  // Append URL to Group

//   function appendURL() {
//     let allDataArray = [];
  
//     // Retrieve allDataArray from local storage
//     if (localStorage.getItem("allDataArray") !== null) {
//       allDataArray = JSON.parse(localStorage.getItem("allDataArray"));
//     }
  
//     saveUrlBtn.addEventListener("click", function() {
//       const url = {
//         user: userName.value,
//         group: chooseGroup.value,
//         title: websiteTitle.value,
//         url: websiteUrl.value,
//       };
  
//       const urlRegex = new RegExp(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/);
//       if (!urlRegex.test(url.url)) {
//         alert("Invalid URL, please enter a valid URL.");
//         return;
//       }
//       if (
//         userName.value &&
//         websiteTitle.value &&
//         websiteUrl.value &&
//         chooseGroup.value !== "Select Group..."
//       ) {
//         url.websiteName = getUrlName(url.url);
//         console.log(url.websiteName);
//         allDataArray.push({ content: { urls: url } });
//         console.log(user.content.urls);
  
//         displayData(allDataArray);
//         clear(chooseGroup, websiteTitle, websiteUrl);
//       } else {
//         alert("Please fill in all fields and select a group.");
//       }
  
//       // Store the updated allDataArray in local storage
//       localStorage.setItem("allDataArray", JSON.stringify(allDataArray));
//     });
//   }

// Retrieve allDataArray from local storage
if (localStorage.getItem("allDataArray") !== null) {
  allDataArray = JSON.parse(localStorage.getItem("allDataArray"));
  displayData(allDataArray)
}else{
    allDataArray = []
}

function appendURL() {
    
    saveUrlBtn.addEventListener("click", function() {
      const url = {
        user: userName.value,
        group: chooseGroup.value,
        title: websiteTitle.value,
        url: websiteUrl.value,
      };
  
      const urlRegex = new RegExp(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/);
      if (!urlRegex.test(url.url)) {
        alert("Invalid URL, please enter a valid URL.");
        return;
      }
      if (
        userName.value &&
        websiteTitle.value &&
        websiteUrl.value &&
        chooseGroup.value !== "Select Group..."
      ) {
        url.websiteName = getUrlName(url.url);
        allDataArray.push({ content: { urls: url } });
        displayData(allDataArray);
        clear(chooseGroup, websiteTitle, websiteUrl);
      } else {
        alert("Please fill in all fields and select a group.");
      }
  
      // Store the updated allDataArray in local storage
      localStorage.setItem("allDataArray", JSON.stringify(allDataArray));
    });
    getStatistics()

    
  }
      
  appendURL()

  // display data in table

  function displayData(array) {
    let table = '';
    let rowIndex = 1;
    array.forEach((item,index) => {
      const data = item.content.urls;
      table += `<tr>
        <td>${rowIndex}</td>
        <td>${data.user}</td>
        <td>${data.group}</td>
        <td>${data.title}</td>
        <td>${data.websiteName}</td>
        <td>${data.url}</td>
        <td>
            <button onclick="visit(${index})" class="btn btn-update "><i class="fa-solid fa-eye"></i></button>
          <button onclick="editUrl(${index})" data-bs-toggle="modal" data-bs-target="#editUrl"  class="btn btn-update "><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteUrl(${index})"  class="btn btn-delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>`;
      rowIndex++;
    });
  
    tbody.innerHTML = table;
  }



  function deleteUrl(id) {
    const urlToDelete = allDataArray[id].content.urls.url;
    if (confirm(`Are you sure you want to delete the following URL?\n\n${urlToDelete}`)) {
      allDataArray.splice(id, 1);
      localStorage.setItem("allDataArray", JSON.stringify(allDataArray));
      displayData(allDataArray);
    }
  }

// visit website
function visit(id){
    let url = allDataArray[id].content.urls.url;
    window.open(url)
}

//edit url



function editUrl(id) {
    chooseGroupu = chooseGroup;
  
    const data = allDataArray[id].content.urls;
    websiteTitleu.value = data.title;
    websiteUrlu.value = data.url;
    websiteNameu.value = data.websiteName;
    console.log(data);
    websiteTitleu.classList.add('bg-danger', 'text-white');
    websiteUrlu.classList.add('bg-danger', 'text-white');
    websiteNameu.classList.add('bg-danger', 'text-white');
    websiteTitleu.focus();
    document.getElementById('saveU').addEventListener('click', function() {
      if (websiteTitleu.value && websiteUrlu.value) {
        const url = {
          group: data.group,
          title: websiteTitleu.value,
          url: websiteUrlu.value,
          websiteName: 'websiteNameu'
        };
        allDataArray[id].content.urls = url;
        clear(chooseGroupu, websiteTitleu, websiteUrlu);
        localStorage.setItem("allDataArray", JSON.stringify(allDataArray));
        displayData(allDataArray);
      }
    });
  }



function resetInp(){
    websiteTitle.value = ""
    websiteUrl.value  = ""
    chooseGroup.value = ""

}

// Get website name
function getUrlName(str){
    url = str
    console.log(url)
    const regex = /\/\/(?:www\.)?([A-Za-z0-9-]+)\./;
    const match = regex.exec(url);
    const domain = match ? match[1] : null;
    return domain
}






// Search website

function search() {
    searchInput.addEventListener("keyup", function() {
      const searchTerm = searchInput.value.toLowerCase();
      let result = [];
      if (searchTerm.trim() === "") {
        // If the search input is empty, display all data
        result = allDataArray;
      } else {
        // Filter the data based on the search term
        result = allDataArray.filter((elem) => {
          const data = elem.content.urls;
          return (
            data.title.toLowerCase().includes(searchTerm) ||
            data.websiteName.toLowerCase().includes(searchTerm) ||
            data.url.toLowerCase().includes(searchTerm)||
            data.user.toLowerCase().includes(searchTerm)
          );
        });
      }
      
      // Empty the table body before displaying search results
      tbody.innerHTML = "";
      
      // Display the search results
      displayData(result);
    });
  }

search()

if(!userSelection){
    disable(true  , chooseGroup , websiteTitle , websiteUrl , saveUrlBtn , reset   , table)
}
// searchInput
// statistics Functions
function getStatistics() {
    let allDataCount = {
      users: new Set(),
      groups: new Set(),
      urls: 0,
    };
    let userDataCount = [];
    allDataArray.forEach((elem, index) => {
      allDataCount.users.add(elem.content.urls.user);
      allDataCount.groups.add(elem.content.urls.group);
      allDataCount.urls++;
      if (elem.content.urls.user.includes(userName.value)) {
        userDataCount.push([
          elem.content.urls.user,
          elem.content.urls.group,
          elem.content.urls.url,
        ]);
      }
    });
    let tempGroup = [];
    userDataCount.forEach((elem, index) => {
      tempGroup.push(elem[1]);
    });
    let statistics = [userDataCount.length, new Set(tempGroup).size];
    userPages.textContent = statistics[0];
    userGroups.textContent = statistics[1];
    let total = {
      users: allDataCount.users.size,
      groups: allDataCount.groups.size,
      urls: allDataCount.urls,
    };
    let card = getTotalStatistics(total);
    statisticsCard.innerHTML = card;
  }
  
  function getTotalStatistics(total) {
    let card = "";
    for (const key of Object.keys(total)) {
      const value = total[key];
      card += `
      
        <div class="card-wrap">
          <div class="card-body d-flex align-items-center">
            <div class="icon me-3">
              <i id="icon" class="fas fa-users"></i>
            </div>
            <div class="text">
              <h6 id="statisticsTitle" class="mb-0">${key}</h6>
              <p id="statisticsBody" class="mb-0">${value}</p>
            </div>
          </div>
        </div>
      `;
    }
    return card;
  }




getStatistics()

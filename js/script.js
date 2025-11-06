/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const header = document.querySelector('header');
let searchHtml = `<label for="search" class="student-search">
               <span>Search by name</span>
               <input id="search" placeholder="Search by name...">
               <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
            </label>`
header.insertAdjacentHTML('beforeend',searchHtml);

const numPages = 9;
const buttonsUL = document.querySelector('.link-list');
const search = document.querySelector('#search');
const searchButton = document.querySelector('.student-search > button');

/*
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page){
   const startIndex = (page * numPages) - numPages;
   const endIndex = page * numPages;
   const studentListUL = document.querySelector('.student-list');
   studentListUL.innerHTML = '';

   for(student in list){
           if(student>=startIndex && student<endIndex){ 
         let html = `
            <li class="student-item cf">
                <div class="student-details">
                  <img class="avatar" src="${list[student].picture.large}" alt="Profile Picture">
                  <h3>${list[student].name.first} ${list[student].name.last}</h3>
                  <span class="email">${list[student].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[student].registered.date}</span>
               </div>
            </li>
         `;
         studentListUL.insertAdjacentHTML("beforeend", html);
      }
   }
   
}


/*
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
   let numButtons = Math.ceil(list.length / numPages);
   let buttonActive = document.querySelector('.active'); 
   buttonsUL.innerHTML = '';

   for(let i = 1; i<=numButtons; i++){
      let html = `
         <li>
            <button type='button'>${i}</button>
         </li>
      `;
      buttonsUL.insertAdjacentHTML('beforeend', html);
   }

   //keeps track of active class on buttons after clearing innerHTML of the pagination ul
   if(!buttonActive){
      let button = document.querySelector('.link-list li > :first-child');
      button.classList.add('active');   
      }
   else { //selects new button from innerHTML and sets active class
      buttonActive=document.querySelector(`.link-list li:nth-child(${buttonActive.textContent}) button`);
      buttonActive.classList.add('active');
   }
   
 
}

  /*
      gets input from search input
      adds students to searchResults[] array
      calls addPagination and showPage with search results array
   */
function searchStudents(students, page){
   let searchResults = [];

   for(let student of students){
      let name = student.name.first.toLowerCase() + ' ' +student.name.last.toLowerCase();
      let searchName = search.value.toLowerCase();
      
      if(name.includes(searchName)){
         searchResults.push(student);
      }
   }
   if(searchResults.length === 0){
      let ul = document.querySelector('.student-list');
      ul.innerHTML='';
      buttonsUL.innerHTML = '';
      html=`<h3>no students found</h3>`;
      ul.insertAdjacentHTML('beforeend',html);
   }
   else{
      addPagination(searchResults);
      showPage(searchResults, page);
   }
   
}

/*
   event listener to set active pagination class on button clicked
*/
buttonsUL.addEventListener('click', (e) =>{
      let button1 = document.querySelector('.active');
      
      if(e.target.type === 'button'){
         let button2 = e.target.closest('button');
         button1.classList.remove('active');
         button2.classList.add('active'); 
         if(search.value===''){
            showPage(data, button2.textContent);
            addPagination(data);
         }
         else{
            searchStudents(data, button2.textContent);
         }
        
         
      }

}); 

search.addEventListener('keyup', () => {
   searchStudents(data, 1);
});

searchButton.addEventListener('click', () => {
   searchStudents(data, 1);
});

showPage(data, 1);
addPagination(data, false);
// Call functions

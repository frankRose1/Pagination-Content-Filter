const students = document.querySelectorAll('.student-item');
const totalStudents = students.length;
const paginationDiv = document.querySelector('.pagination');
const studentUL = document.querySelector('.student-list');

//hide the students
students.forEach(student => {
    student.style.display = 'none';
});

//create HTML dynamically
const studentArray = Array.from(students);
const studentHTML = studentArray.map(student => {
    return `
     <li class="student-item cf">
        <div class="student-details">
            <img class="avatar" src="${student.children[0].children[0].src}">
            <h3>${student.children[0].children[1].innerText}</h3>
            <span class="email">${student.children[0].children[2].innerText}</span>
        </div>
        <div class="joined-details">
           <span class="date">${student.children[1].children[0].innerText}</span>
        </div>
    </li>
    `;
}).join('');

studentUL.innerHTML = studentHTML;

//create a function that creates links in the DOM based on the number of pages needed
function createLinks(studentList){
    const limit = 10; //students per page
    const maxPages = Math.ceil(studentList.length / limit);
    
    const ul = document.createElement('ul');
    paginationDiv.appendChild(ul);
    let html = ``;  //build up this html varialble with links

    for (let i = 1; i <= maxPages; i++) {
        const link =  
        `<li>
            <a href="#" data-page="${i}">${i}</a>
        </li>`;
        html+= link;
    }

    //then use innerHTML to add them to the DOM
    ul.innerHTML = html;
    pagination(1, studentList);
}

//default to page 1
function pagination( page = 1, list){
   
    const limit = 10; //students per page
    const maxPages = Math.ceil(list.length / limit);
    const maxIndex = limit * maxPages;
    const skipIndex = (page * limit) - limit;
    const upper = maxIndex - ( maxIndex - (limit * page) );
    const listNodes = studentUL.children;
    //loop over the list and see where the students land
    for (let i = 0; i < listNodes.length; i++) {
        //if the index is greater than the skip, and lower than the upper value then we show the student, else we hide them
        if ( i >= skipIndex && i < upper) {
            listNodes[i].style.display = 'block';
        } else {
            listNodes[i].style.display = 'none'
        }
    } //end loop
}

function getPage(e){
    if(!e.target.matches('a')) return; //skip if its not an anchor el
    const page = parseInt(e.target.dataset.page);
    pagination(page, students);
    //toggle active class
    const liNodes = paginationDiv.firstElementChild.childNodes;
    liNodes.forEach(li => {
        li.firstElementChild.classList.remove('active');
    });
    e.target.classList.add('active');
}

//implement pagination when a link is clicked, need to delegate event since links are created dynamically
paginationDiv.addEventListener('click', getPage);
createLinks(students);

///////////////////////////////////// START SEARCH FEATURE/////////////////////////////////////////////
// create the elements, append them to the page
const searchDiv = document.querySelector('.student-search');
const search =  document.createElement('input');
search.type = 'text';
search.placeholder = "Search for students..."
const searchButton = document.createElement('button');
searchButton.innerText = 'Search';
searchButton.style.cursor  = 'pointer';
searchDiv.appendChild(search);
searchDiv.appendChild(searchButton);

//this will filter down the data to only the word that we matched
  function findMatches(wordToMatch, list){
    const studentArr = Array.from(list);
    //we need to filter this list and return only items that match the searched word
    return studentArr.filter(student => {
        const regex = new RegExp(wordToMatch, 'ig');
        return student.children[0].children[1].innerText.match(regex) || student.children[0].children[2].innerText.match(regex);
    });
  }

  //whenever someone changes the value of the input, display the results
  function displayResults(e){
    if (!e.target.matches('input')) return; //skip if its not a search input
    // show the results of the findMatches function
    const matchedArray = findMatches(e.target.value, students);
    const html = matchedArray.map(student => {
        return `
          <li class="student-item cf">
             <div class="student-details">
                <img class="avatar" src="${student.children[0].children[0].src}">
                <h3>${student.children[0].children[1].innerText}</h3>
                <span class="email">${student.children[0].children[2].innerText}</span>
            </div>
            <div class="joined-details">
                <span class="date">${student.children[1].children[0].innerText}</span>
            </div>
          </li>
        `;
    }).join('');
    studentUL.innerHTML = html;
  }

// delegate event to the search input
searchDiv.addEventListener('keyup', displayResults);
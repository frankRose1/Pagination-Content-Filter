const studentList = document.querySelectorAll('.student-item');
const totalStudents = studentList.length;
const paginationDiv = document.querySelector('.pagination');

//hide all of the students
studentList.forEach(student => { 
    student.style.display = 'none';
});

//create a function that creates links in the DOM based on the number of pages needed
function createLinks(){
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
}

//default to page 1
function pagination( page = 1, list = studentList){
   
    const limit = 10; //students per page
    const maxPages = Math.ceil(list.length / limit);
    const maxIndex = limit * maxPages;
    const skipIndex = (page * limit) - limit;
    const upper = maxIndex - ( maxIndex - (limit * page) );
    //loop over the list and see where the students land
    list.forEach( (el, i) => {
        //if the index is greater than the skip, and lower than the upper value then we show the student, else we hide them
        if ( i >= skipIndex && i < upper) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none'
        }
    });// end loop
}

function getPage(e){
    if(!e.target.matches('a')) return; //skip if its not an anchor el
    const page = parseInt(e.target.dataset.page);
    pagination(page);
    //toggle active class
    const liNodes = paginationDiv.firstElementChild.childNodes;
    liNodes.forEach(li => {
        li.firstElementChild.classList.remove('active');
    });
    e.target.classList.add('active');
}

//implement pagination when a link is clicked, need to delegate event since links are created dynamically
paginationDiv.addEventListener('click', getPage);

createLinks();
pagination();

// START SEARCH FEATURE
//create the elements, append them to the page
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
//studentList is not an array, its a nodelist, we need to convert it in order to use filter
  function findMatches(wordToMatch, list){
    let newArr = [];
    newArr.push(...list);
    //map over the array to get only the properties we need for this part
    const studentArray = newArr.map(student => {
        return {
            name: student.children[0].children[1].innerText,
            email: student.children[0].children[2].innerText
        };
    });
    //we need to filter this list and return only items that match the searched word
    return studentArray.filter(student => {
        const regex = new RegExp(wordToMatch, 'ig');
        //if the word(regex) matches the student name or email, return it
        return student.name.match(regex) || student.email.match(regex);
    });
  }

  //whenever someone changes the value of the input, display the results
  function displayResults(e){
    if (!e.target.matches('input')) return; //skip if its not a search input
    //show the results of the findMatches function
    // const matchedArray = findMatches(e.target.value, studentList);
    // console.log(matchedArray);
    //we need to compare our matched array with out nodeList
    studentList.forEach(el => {
        if (el.children[0].children[1].innerText.includes(e.target.value) || 
            el.children[0].children[2].innerText.includes(e.target.value)) {
                el.style.display = 'block';
        } else {
                el.style.display = 'none';
        }   
    });
   
  }

// delegate event to the search input
searchDiv.addEventListener('keyup', displayResults);
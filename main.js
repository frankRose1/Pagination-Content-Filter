const pageDiv = document.querySelector('.page');
const studentList = document.querySelectorAll(".student-item");
const studentsPerPage = 10;
const numberOfPages = Math.ceil(studentList.length/studentsPerPage); //determines how many pages are needed

//display a "page" or a list of ten students based which page number the user selected.
function showPage(pageNumber, students = studentList) {
  //give a range of students we want displayed per page number
  const upperNum = studentsPerPage * pageNumber;
  const lowerNum = upperNum - studentsPerPage;

  students.forEach( (student, i) => {
    student.style.display = 'none';
    // if student should be on this page number
    if ( (i >= lowerNum) && (i < upperNum) ) {
       student.style.display = "block";  // show the student
     } 
  });
 }

//create and append page links 
function appendPageLinks(numOfPages) {
 
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('pagination');
  const ul = document.createElement('ul');
  paginationDiv.appendChild(ul);
  pageDiv.appendChild(paginationDiv);
    
//         for every page
//           add a page link to the pagination Div
      for (let i = 1; i <= numberOfPages; i++) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = "#";
        link.text = [i];
        li.appendChild(link);
        ul.appendChild(li);

        // will set the first link's class to "active" by default
        if (link.text == '1') {
          link.classList.add('active');
        }

        activeLink(link);
      } //end of for loop
}

//show the relevant page and toggle the 'active class'    
 function activeLink(link) {
     link.addEventListener('click', (e) => {
         //show the page determined by the target link's text
         showPage(e.target.text);
         //toggle 'active' class as links are clicked
         document.querySelectorAll('.pagination a').forEach( link => link.classList.remove('active'));
         e.target.classList.add('active');
     });
 }

showPage(1); // When the page loads, hide all but the first 10 students in the list.
appendPageLinks(numberOfPages);


//SEARCH BUTTON BEGIN 
//create and append a search component to sort through a list of students
//when search button is clicked us the value to display student names/emails that match the input value
const pageHeader = document.querySelector('.page-header');

//create the necessary elements
const searchDiv = document.createElement('div');
searchDiv.classList.add('student-search');
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search a student';
const searchButton = document.createElement('button');
searchButton.innerHTML = 'Search'
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);

pageHeader.appendChild(searchDiv);

//extract the information needed from the array
//this is what we need: 
// studentDetails[0].children[1].innerHTML
// "iboya vat"
// studentDetails[0].children[2].innerHTML
// "iboya.vat@example.com"

//convert the student list from a node list to an array
const studentDetails = document.querySelectorAll('.student-details');
const newArr = Array.from(studentDetails);
//extract the neccessary information, use an array of objects, each obj representing a student
let studentData = [];
newArr.forEach(el => {
  studentData.push( {name: el.children[1].innerHTML, email: el.children[2].innerHTML} );
});

//pass in a word to match and the data it's being matched against
const matchWord = function(wordToMatch, studentData) {
  return studentData.filter(student => {
    //figure out if the student name or email matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    //if either of these is true it will return/filter them
    return student.name.match(regex) || student.email.match(regex) ;
  });
}







const displayMatches = function(){
  const matchedArray = matchWord(this.value || searchInput.value, studentData);
  console.log(matchedArray);
}
//button must filter student names when clicked
searchButton.addEventListener('click', displayMatches);
  //search box could have a keyup event listener that filters data in real time
searchInput.addEventListener('keyup', displayMatches);


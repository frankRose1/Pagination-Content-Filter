const pageDiv = document.querySelector('.page');
const studentList = document.querySelectorAll(".student-item");
const studentsPerPage = 10;
const numberOfPages = Math.ceil(studentList.length/studentsPerPage);

//display a "page" or a list of ten students based which page number the user selected.
function showPage(pageNumber = 1, students = studentList) {
  //set the range of students
  const upperNum = studentsPerPage * pageNumber;
  const lowerNum = upperNum - studentsPerPage;

  students.forEach( (student, i) => {
    student.style.display = 'none';
    // if student should be on this page number, show the student
    if ( (i >= lowerNum) && (i < upperNum) ) {
       student.style.display = "block";  
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
    
      //for every page
      //add a page link to the pagination Div
      for (let i = 1; i <= numberOfPages; i++) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = "#";
        link.text = [i];
        li.appendChild(link);
        ul.appendChild(li);

        //set the first link's class to "active" by default
        if (link.text == '1') {
          link.classList.add('active');
        }

        activeLink(link);
      } //end for loop
}

//show the relevant page and toggle the 'active class'    
 function activeLink(link) {
     link.addEventListener('click', (e) => {
         showPage(e.target.text);
         //toggle 'active' class as links are clicked
         document.querySelectorAll('.pagination a').forEach( link => link.classList.remove('active'));
         e.target.classList.add('active');
     });
 }

showPage(); // When the page loads, hide all but the first 10 students in the list.
appendPageLinks(numberOfPages);


////////////////////////////////////SEARCH COMPONENT BEGIN ///////////////////////////////////////
//filter feature is working
  //HANDLE NO RESULTS if no matches are found, alert the user in the HTML
  //HANDLE pagination -> if 22 results are given, show 3 pages etc
const pageHeader = document.querySelector('.page-header');

//create the necessary elements
const searchDiv = document.createElement('div');
searchDiv.classList.add('student-search');
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search a student';
const searchButton = document.createElement('button');
searchButton.style.cursor = "pointer";
searchButton.innerHTML = 'Search'
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);

pageHeader.appendChild(searchDiv);

//use the search input to sort through the studentList on keyup and on button click
function displayStudents(){

  const studentDetails = document.querySelectorAll('.student-details');
  const filter = searchInput.value.toLowerCase();
  // Loop through all students, and hide those who don't match the search query
  for (let i = 0; i < studentDetails.length; i++) {
    const studentName = document.querySelectorAll('.student-details h3')[i].innerHTML;
    const studentEmail = document.querySelectorAll('.student-details span')[i].innerHTML;
    if (studentName.toLowerCase().indexOf(filter) > -1 || 
        studentEmail.toLowerCase().indexOf(filter) > - 1 ) {
            console.log(studentName, studentEmail);
            studentList[i].style.display = "";
          } else {
            console.log(studentName, studentEmail);
            studentList[i].style.display = "none";
          }
  } //end loop
}

searchButton.addEventListener('click', displayStudents);
searchInput.addEventListener('keyup', displayStudents);
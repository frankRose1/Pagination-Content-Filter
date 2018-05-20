const pageDiv = document.querySelector('.page');
const studentList = document.querySelectorAll(".student-item");
const studentsPerPage = 10;
const numberOfPages = Math.ceil(studentList.length/studentsPerPage); //determines how many pages are needed

// // This  function displays a "page" or a list of ten students based which page number the user selected.
function showPage(pageNumber) {
  //these variables give a range of students we want displayed per page number
  const upperNum = studentsPerPage * pageNumber;
  const lowerNum = upperNum - studentsPerPage;

  studentList.forEach( (student, i) => {
    student.style.display = 'none';

    // if student should be on this page number
    if ( (i >= lowerNum) && (i < upperNum) ) {
       student.style.display = "block";  // show the student
     } 
  });
 }

//create and append page links 
function appendPageLinks() {
 
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('pagination');
  const ul = document.createElement('ul');
  paginationDiv.appendChild(ul);
  pageDiv.appendChild(paginationDiv);
    
    
    
        // for every page
          // add a page link to the pagination Div
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

showPage(1, studentList); // When the page loads, hide all but the first 10 students in the list.
appendPageLinks();

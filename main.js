
const pageDiv = document.querySelector('.page');
const studentList = document.querySelectorAll(".student-item");
const studentsPerPage = 10;
const numberOfPages = Math.ceil(studentList.length/studentsPerPage); //determines how many pages are needed
//page link section
const paginationDiv = document.createElement('div');
paginationDiv.className = 'pagination';
const ul = document.createElement('ul');
pageDiv.appendChild(paginationDiv);


// // This  function displays a "page" or a list of ten students based which "page number" the user selected.
function showPage(pageNumber, studentList) {
  //these variables give a range of students we want displayed per specific page number
  const upperNum = studentsPerPage * pageNumber;
  const lowerNum = upperNum - studentsPerPage;

   for (let i = 0; i < studentList.length; i++) {
     studentList[i].style.display = "none"; // first hide all students on the page
     if ((i >= lowerNum) && (i < upperNum)) { // if student should be on this page number
       studentList[i].style.display = "block"; 	// show the student
     }
   }
 }

function appendPageLinks(studentList) {
        // for every page
          // add a page link to the page link section
      for (let i = 1; i <= numberOfPages; i++) {
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = "#";
        anchor.text = [i];
        li.appendChild(anchor);
        ul.appendChild(li);
        // adds an event listener to each link created
        ul.addEventListener('click', (e) => {
          if (e.target === anchor) {
            showPage(e.target.text, studentList); //calls the showpage function and determines the page number by using the anchor tag's text;
            //toggles 'active' class
            $('.pagination a').removeClass();
            $(e.target).addClass('active');
          }//end of if statement
        }); //end of eventListener
    }//end of for loop
    paginationDiv.appendChild(ul);
}

showPage(1, studentList); // When the page loads, hide all but the first 10 students in the list.
appendPageLinks(studentList);

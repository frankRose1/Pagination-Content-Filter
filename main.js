
const studentList = document.querySelectorAll(".student-item");
const studentsPerPage = 10;




// // This  function displays a "page" or a list of ten students based which "page number" the user selected.
function showPage(pageNumber, studentList) {
  //these variables give a range of students we want displayed per specific page number
  const upper = studentsPerPage * pageNumber;
  const lower = upper - studentsPerPage;

   for (let i = 0; i < studentList.length; i++) {
     studentList[i].style.display = "none"; // first hide all students on the page
     if ((i >= lower) && (i < upper)) { // if student should be on this page number
       studentList[i].style.display = "block"; 	// show the student
     }
   }
 }
showPage(3, studentList);


function appendPageLinks(studentList/* take a student list as an argument */) {
    const numberOfPages = Math.ciel(studentList.length/10);// determine how many pages for this student list
        // create a page link section
    // “for” every page
        // add a page link to the page link section
    // remove the old page link section from the site
    // append our new page link section to the site
    // define what happens when you click a link
        // Use the showPage function to display the page for the link clicked
        // mark that link as “active”
}

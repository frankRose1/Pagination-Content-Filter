
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
  const upper = studentsPerPage * pageNumber;
  const lower = upper - studentsPerPage;

   for (let i = 0; i < studentList.length; i++) {
     studentList[i].style.display = "none"; // first hide all students on the page
     if ((i >= lower) && (i < upper)) { // if student should be on this page number
       studentList[i].style.display = "block"; 	// show the student
     }
   }
 }



function appendPageLinks(studentList) {

      // “for” every page
          // add a page link to the page link section
      for (let i = 1; i <= numberOfPages; i++) {
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = "#";
        anchor.text = [i];
        li.appendChild(anchor);
        ul.appendChild(li);
        paginationDiv.appendChild(ul);
        // adds an event listener to each link created
        ul.addEventListener('click', (e) => {
          if (e.target == anchor) {
            console.log('hi');
          }
        });
    }

    // remove the old page link section from the site
    // append our new page link section to the site
    // define what happens when you click a link
        // Use the showPage function to display the page for the link clicked
        // mark that link as “active”
}

showPage(1, studentList);
appendPageLinks(studentList);

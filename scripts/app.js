//we want to implement pagination and show links based on the number of items
    //pagination logic:
        //we need a limit, number of students per page -> 10
        //we need to skip certain items if they dont fall in the range
            //(eg) on page 4? we want to show 11-20
        //we also need to know what page we're currently on, default 1

//we also want to add a search feature that will filter the list and display it on the page


const studentList = document.querySelectorAll('.student-item'); //nodelist of all the students
const totalStudents = studentList.length;

//hide all of the students
studentList.forEach(student => { 
    student.style.display = 'none';
});

//default to page 1
function pagination( page = 1, list = studentList){
   
    const limit = 10; //students per page
    const maxPages = Math.ceil(list.length / limit);
    const maxIndex = limit * maxPages;
    const skipIndex = (page * limit) - limit;
                // 1  *   10   -  10   -> we skip 0( show the first 10 )
                // 2 *     10  -   10  ->  we skip 10 (first 10 are skipped) how do we hide everything after 20?

        // the second calucaltion is the limit scaling based on the page number subtracted from the max value
        //so if page number is 3 then that calc = 30, and upper equals 30
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

//create a function that creates links in the DOM based on the number of pages needed
function createLinks(){
    const limit = 10; //students per page
    const maxPages = Math.ceil(studentList.length / limit);
    //create the html needed for the pagination links at bottom of page
    const paginationDiv = document.querySelector('.pagination');
    const ul = document.createElement('ul');
    paginationDiv.appendChild(ul);
    //build up this html varialble with links
    let html = ``;

    //create a number of links equal to maxPages
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

//implement pagination when a link is clicked



createLinks();
pagination();
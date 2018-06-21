//we want to implement pagination and show links based on the number of items
    //pagination logic:
        //we need a limit, number of students per page -> 10
        //we need to skip certain items if they dont fall in the range
            //(eg) on page 4? we want to show 11-20
        //we also need to know what page we're currently on, default 1

//we also want to add a search feature that will filter the list and display it on the page


const studentList = document.querySelectorAll('.student-item'); //nodelist of all the students
const totalStudents = studentList.length;

studentList.forEach(student => { //hide all of the students
    student.style.display = 'none';
});

function pagination( page = 1, list = studentList){
    //we have a nodeList and we only want to display a certain number of the students based on a page
    const limit = 10; //students per page
    const pagesNeeded = Math.ceil(list / limit);
    const skip = (page * limit) - limit;
                // 1  *   10   -  10   -> we skip 0( show the first 10 )
                // 2 *     10  -   10  ->  we skip 10 (first 10 are skipped) how do we hide everything after 20?
    //now we need an upper value
    
    //loop over the list and see where the students land
    list.forEach( (el, i) => {
        //if the index is greater than the skip then we show the student
        if ( i >= skip ) {
            el.style.display = 'block';
        }
    });// end loop

}

pagination();
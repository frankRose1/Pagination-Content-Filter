(function() {

    const students = document.querySelectorAll('.student-item');
    const studentUL = document.querySelector('.student-list');
    const limit = 10; //students per page
    const paginationDiv = document.querySelector('.pagination');
    const paginationUL = document.createElement('ul');
    paginationDiv.appendChild(paginationUL);

    //hide the student node list
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

    //create links in the DOM based on the number of pages needed
    function createLinks(studentList){
        const maxPages = Math.ceil(studentList.length / limit);
        paginationUL.innerHTML= ''; //clear the HTML of the UL so that the search feature can add links dynamically
        let html = ``; 

        for (let i = 1; i <= maxPages; i++) {
            const link =  
            `<li>
                <a href="#" data-page=${i} ${i === 1 ? 'class=active' : ""}>${i}</a>
            </li>`;
            html+= link;
        }

        paginationUL.innerHTML = html;
        pagination(1, studentList);
    }

    function pagination( page, list){
        const maxPages = Math.ceil(list.length / limit);
        const maxIndex = limit * maxPages;
        const skipIndex = (page * limit) - limit;
        const upper = maxIndex - ( maxIndex - (limit * page) );
        const studentNodes = studentUL.children;
        //loop over the list and see where the students land
        for (let i = 0; i < list.length; i++) {
            //if the index is greater than the skip, and lower than the upper value then we show the student, else we hide them
            if ( i >= skipIndex && i < upper) {
                studentNodes[i].style.display = 'block';
            } else {
                studentNodes[i].style.display = 'none';
            }
        } //end loop
    }

    function getPage(e){
        if(!e.target.matches('a')) return; //skip if its not an anchor el
        const page = parseInt(e.target.dataset.page);
        const liNodes = paginationDiv.firstElementChild.childNodes;
        const studentNodes = studentUL.children;
        pagination(page, studentNodes);
        //toggle active class
        liNodes.forEach(li => {
            li.firstElementChild.classList.remove('active');
        });
        e.target.classList.add('active');
    }

    //implement pagination when a link is clicked, need to delegate event since links are created dynamically
    paginationDiv.addEventListener('click', getPage);

    createLinks(students); //create links on page load


    ///////////////////////////////////// START SEARCH FEATURE/////////////////////////////////////////////
    const searchDiv = document.querySelector('.student-search');
    const search =  document.createElement('input');
    search.type = 'text';
    search.placeholder = "Search for students..."
    searchDiv.appendChild(search);

    //filter down the data to only the word that was matched
    function findMatches(wordToMatch, list){
        const studentArr = Array.from(list);
        return studentArr.filter(student => {
            const regex = new RegExp(wordToMatch, 'ig');
            return student.children[0].children[1].innerText.match(regex) || student.children[0].children[2].innerText.match(regex);
        });
    }

    function noResults(){
        return `
            <li class="no-results">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Sorry, no results were found!</p>
            </li>
        `;
    }

    //whenever someone changes the value of the input, display the results
    function displayResults(e){
        if (!e.target.matches('input')) return; //skip if its not an input
        // show the results of the findMatches function
        const matchedArray = findMatches(e.target.value, students);
        //if no results are found, dislay a message for the user
        if (matchedArray.length === 0) {
            studentUL.innerHTML = noResults();
            return; //exit
        }
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
        //create links based off of the filtered array length
        createLinks(matchedArray);
    }

    searchDiv.addEventListener('keyup', displayResults); // delegate event to the search input

})();
# Pagination & Content Filter
Using pagination to filter a list of students in a directory. The student node list is converted in to an array and then mapped to a string to be inserted in to the DOM. Links are generated dynamically based on the number of students per page(default to 10). When a link is clicked, that page number is used to determine the range of students to be shown. Number of students shown per page can be changed by altering the ```limit``` variable in ```scripts/app.js```.

## App Features
* Pagination with JavaScript
* Students are displayed in ranges depending on the page number clicked, and the desired number of students per page
* The current link is indicated with an "active" class
* Search feature, matches name and email, which will filter the students on the ```keyup``` event
* If no results are returned, a friendly message is shown
* This will work with any number of elements in the DOM. You can try it out with ```student-list-example/students64.html``` which has more elements to be filtered

## Built With
* HTML
* CSS
* JavaScript

## Author 
Frank Rosendorf

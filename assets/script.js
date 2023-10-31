
/* Need high score array. */
var highScoresArray = [];
/* Need a question object array to store all of the questions. */
var questionArray = [];
/* Need score variable for current game.  Initializing score variable to zero because I'm allergic
to not initializing variables, and it can result in unpredictable errors if you make
a mistake. */
var currentScore = 0;

/* Need question class.  Question class needs numerical correct answer variable that indicates which
answer is the correct one.  We haven't quite gone over these in class, so I had to look this up
in the Mozilla documents.  */

class Question{
    constructor(quesText, answerArray,correctNum){
        this.quesText = quesText; // Question text
        this.answerArray = answerArray;
        this.correctNum = correctNum; // the number of the correct answer; somehow attach to button pressed
    }

    // Getter for the question text
    get quesText(){ return this.quesText;}
    
    /* Getter for answer array.  Initially had all of the answers as separate variables, but decided that an array
    of answer responses is better for this. */
    get answerArray(){ return this.answerArray;}

    // Getter for the correct answer number
    get correctNum(){ return this.correctNum;}

}

/* Need a score class so we can store scores with player initials. */

class Score{
    constructor(initials, scoreNum){
        this.initials = initials; // player initials or name
        this.scoreNum = scoreNum; // player score
    }

    // getter for player initials or name
    get initials(){ return this.initials;}
    // getter for the score number of which answer is correct
    get scoreNum(){ return this.scoreNum;}
}

/* Function to create question objects and store them to an array that is the returned.  Using a limited number of questions
just because this is supposed to be a short assignment.  Also questions are invented by me just for testing. 
Definitely a much better way of doing this, but I can't think of one in the moment.
*/
function generateQuestionArray (){
    var quest1 = "Which of these is an HTML tag?";
    var quest2 = "What kind of script is used to change the appearance of a webpage?";
    var quest3 = "What is the name of the default file for web sites?";
    var quest4 = "'script.js' is what kind of file?";
    var quest5 = "Who likes Javascript the most?";

    var ansArray1 = ["<puppy>", "<assign>", "<h1>", "<tired>"];
    var ansArray2 = ["Catscript", "Javascript", "Hypo Text", "Cascading Style Sheets"];
    var ansArray3 = ["index.html", "style.css", "default.vrm", "hello.txt"];
    var ansArray4 = ["Text", "Javascript", "Batch", "Jumpsecret"];
    var ansArray5 = ["Cats", "Dogs", "Iguanas", "Coffee Fiends"];

    // correct answer variable goes from range 0 to 3 in order to correspond to the array position
    var correct1 = 2;
    var correct2 = 3;
    var correct3 = 0;
    var correct4 = 1;
    var correct5 = 3;
    
    // Array object to be returned when the function is called

    var tempQuestArray = []; //create temporary array; not populated here because this could eventually be set up to pull from a storage document

    tempQuestArray.push(new Question(quest1, ansArray1, correct1)); // create new question object with initial fields and push into the array
    tempQuestArray.push(new Question(quest2, ansArray2, correct2)); // create new question object with initial fields and push into the array
    tempQuestArray.push(new Question(quest3, ansArray3, correct3)); // create new question object with initial fields and push into the array
    tempQuestArray.push(new Question(quest4, ansArray4, correct4)); // create new question object with initial fields and push into the array
    tempQuestArray.push(new Question(quest5, ansArray5, correct5)); // create new question object with initial fields and push into the array

    return tempQuestArray; //return filled array to the function call

}

/* Need function to sort scores.  It has been years since I saw a sorting algorithm/code.  The following code has been borrowed from
https://flexiple.com/javascript/bubble-sort-javascript .  Function returns an array. */
function scoreSort(inputArr){
    
    let len = inputArr.length;
    let checked;
    do {
        checked = false;
        for (let i = 0; i < len; i++) {
            if (inputArr[i].scoreNum() > inputArr[i + 1].scoreNum) { // altered to fit our program; comparing the two scores of two different objects.
                let tmp = inputArr[i];
                inputArr[i] = inputArr[i + 1];
                inputArr[i + 1] = tmp;
                checked = true;
            }
        }
    } while (checked);
    return inputArr;
}

/* Need function to write scores to local storage.  My implementation is a bit more complex than what was covered
in class, so I referenced https://stackoverflow.com/questions/13702100/localstorage-array-of-objects-handling 
for assistance. */

function writeToStorage(scoresArray){

    for (var x = 0; x < scoresArray.length; x++){
        localStorage.setItem("scores", JSON.stringify(scoresArray[x])); /* Please let this work; trying to send each entry into local
        storage using a for-loop to iterate over the array that was passed to the function. */
    }

}

/* Need function to retrieve scores from local storage. This function will return an array.  
https://stackoverflow.com/questions/13702100/localstorage-array-of-objects-handling was referenced for assistance. */
function pullFromStorage(){
    var tempArray = [];
    let tempArray = JSON.parse(localStorage.getItem("scores"));

    if(tempArray !== null){
        highScoresArray = tempArray;
    }

}

/* Need function for the timer. */

/*  Need function to display questions. */
function questionDisplay(){
    let questionArray = generateQuestionArray();

    
}

/*  Need function to determine win/loss. */


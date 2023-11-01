
var timeElement = document.querySelector(".scoreTime"); // retrieve the scoreTime element from the html
var questionElement = document.querySelector(".questionSection"); // for the question display section
var scoreCard = document.querySelector(".scoreSection"); // Scorepage after the game


/* Need high score array. */
var highScoresArray = [];
/* Need a question object array to store all of the questions. */
var questionArray = [];
/* Need score variable for current game.  Initializing score variable to zero because I'm allergic
to not initializing variables, and it can result in unpredictable errors if you make
a mistake. */
var currentScore = 0;

var timeSeconds = 120; // Need to have base set of seconds

/* Need question class.    We haven't quite gone over these in class, so I had to look this up
in the Mozilla documents.  A question class object consists of a string that stores the question text and
an answer object that stores the text of the answer and a boolean indicating if it is the correct answer. */

class Question{
    constructor(quesText, answerArray,correctNum){
        this.quesText = quesText; // Question text
        this.answerArray = answerArray;
        
    }

    // Getter for the question text
    get quesText(){ return this.quesText;}
    
    /* Getter for answer array.  Initially had all of the answers as separate variables, but decided that an array
    of answer responses is better for this. */
    get answerArray(){ return this.answerArray;}

    // Getter for the correct answer number
    get correctNum(){ return this.correctNum;}

}

/* Need a score class so we can store scores with player initials.  By creating score objects,
we can attach numbers to initials and vice-versa. */

class Score{
    constructor(initials, scoreNum){
        this.initials = initials; // player initials or name
        this.scoreNum = scoreNum; // player score
    }

    // getter for player initials or name
    get initials(){ return this.initials;}
    // getter for the score number of which answer is correct
    get scoreNum(){ return this.scoreNum;}
    // setter for player initials or name
    set initials(playerInitials){this.initials = playerInitials;}
    // setter for player score
    set scoreNum(playerScore){this.scoreNum = playerScore;}
}
/* created an answer class in order to solve a possible pitfall that might have been created by an earlier
design.  By assigning the "correct/incorrect" status with the answer, it makes it much more difficult to cause
an error when evaluating the player's choice. */
class Answer{
    constructor(ansText,booAnswer){
        this.ansText = ansText; // Answer text string
        this.booAnswer = booAnswer; // Boolean indicating if this is the correct answer
    }
    //getter for the text
    get ansText(){return this.ansText;}
    //getter for the boolean status
    get booAnswer(){return this.booAnswer;}
    //setter for the text
    set ansText(inputText){this.ansText = inputText;}
    //setter for the boolean
    set booAnswer(inputBoo){this.booAnswer = inputBoo;}
}

/* Function to create question objects and store them to an array that is the returned.  Using a limited number of questions
just because this is supposed to be a short assignment.  Also questions are invented by me just for testing. 
Definitely a much better way of doing this, but I can't think of one in the moment.
*/
function generateQuestionArray (){
    var quest1 = "Which of these is an HTML tag?";
    var quest2 = "What kind of script is used to shape the appearance of a webpage?";
    var quest3 = "What is the name of the default file for web sites?";
    var quest4 = "'script.js' is what kind of file?";
    var quest5 = "Who likes Javascript the most?";

    // create five new answer object arrays and populate them at creation.
    var ansArray1 = [new Answer("<puppy>", false), new Answer("<assign>", false), new Answer ("<h1>", true), new Answer("<tired>", false)];
    var ansArray2 = [new Answer("Catscript", false), new Answer("Jscript", false), new Answer("Hypo Text", false), new Answer("Cascading Style Sheets", true)];
    var ansArray3 = [new Answer("index.html", true), new Answer("style.css", false), new Answer("default.vrm", false), new Answer("hello.txt", false)];
    var ansArray4 = [new Answer("Text", false), new Answer("Javascript", true), new Answer("Batch", false), new Answer("Jumpsecret", false)];
    var ansArray5 = [new Answer("Cats", false), new Answer("Dogs", false), new Answer("Iguanas", false), new Answer("Coffee Fiends", true)];

    
    
    // Array object to be returned when the function is called

    var tempQuestArray = []; //create temporary array; not populated here because this could eventually be set up to pull from a storage document

    tempQuestArray.push(new Question(quest1, ansArray1)); // create new question object with initial fields and push into the array
    tempQuestArray.push(new Question(quest2, ansArray2)); // create new question object with initial fields and push into the array
    tempQuestArray.push(new Question(quest3, ansArray3)); // create new question object with initial fields and push into the array
    tempQuestArray.push(new Question(quest4, ansArray4)); // create new question object with initial fields and push into the array
    tempQuestArray.push(new Question(quest5, ansArray5)); // create new question object with initial fields and push into the array

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
    
    var tempArray = JSON.parse(localStorage.getItem("scores"));

    if(tempArray !== null){
        highScoresArray = tempArray;
    }

}

/* Need function for the timer.  Timer function needs to have a modifier passed to it in order to satisfy the
time-reduction condition.  If a correct answer is selected, then a zero will be passed to the function.  If
an incorrect answer is selected, a set number will be deducted from the timer. */

function timer(modNum){
// FIX; CHANGING THE INTERVAL MUST COME AFTER THE USER INTERACTION
    var timerInterval = setInterval(function(){
        timeSeconds = timeSeconds -(1 + modNum); //reduce seconds by 1 (for normal countdown) and the penalty
        timeElement.textContent = timeSeconds;

        if(timeSeconds === 0){ // INCLUDE WIN CONDITION OR SCORESHEET BUTTON HERE
            clearInterval(timerInterval);
            //ADD MORE STUFF HERE
        }

    }, 1000)


}

/*  Need function to display questions.  Function needs to display questions one at a time while iterating over
all of them. and not iterating until the user makes a selection. */
function questionDisplay(){
    questionArray = generateQuestionArray();
    var numQuestions = questionArray.length; /* retrieve length of the question array; this is how we're going 
    to iterate over all of the questions, regardless if we decide to add more questions later.*/

    while(numQuestions >= 0){
        numQuestions--; /* We're going to use numQuestions to both access the question array and iterate over it;
        we have to deincrement before we access the array because you cannot access an array index that does not
        exist. */
        questionElement.innerHTML = ""; // clear previous question

        var questionText = document.createElement("h1"); // create new heading for the question
        questionText.textContent = questionArray[numQuestions].quesText(); // get the question text

        var dispAnsArray = questionArray[numQuestions].answerArray();/* Retrieve and store the answer array in
        a temporary variable. */ 
        /* Updated: the variable  */
        for(var x = 0; x < dispAnsArray.length; x++){

        }
    }
    
}

/*  Need function to determine win/loss. */


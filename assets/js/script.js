$(document).ready(function () {

    var questionAnswer = [{
            question: "What is Peter's favorite color?",
            answer: "Medium Gray",
            guess1: "Light Gray",
            guess2: "Dark Gray",
            guess3: "Black"
        },
        {
            question: "What is Peter's ideal temperature range?",
            answer: "50-59 °F",
            guess1: "20-29 °F",
            guess2: "0-9 °F",
            guess3: "70-79 °F"
        },
        {
            question: "How old is Peter?",
            answer: "19",
            guess1: "1847",
            guess2: "Legends tells that his age is a mystery even to him...",
            guess3: "63"
        },
        {
            question: "What are the two central motifs in the life of Peter Filicetti?",
            answer: "Multiples of five and symmetry",
            guess1: "Anguish and despair",
            guess2: "Overindulgence and regret",
            guess3: "Overthinking and underperforming"
        },
        {
            question: "What is Peter's middle name?",
            answer: "Charles",
            guess1: "David",
            guess2: "'The Body'",
            guess3: "Evelynn"
        },
        {
            question: "What was Peter's motivation to not attend college?",
            answer: "The fact that it is a waste of precious time",
            guess1: "Lethargy",
            guess2: "Decision paralysis",
            guess3: "Funding"
        },
        {
            question: "What is the name of Peter's dog?",
            answer: "Bella",
            guess1: "Beast",
            guess2: "Brute",
            guess3: "Brutus"
        },
        {
            question: "Is Peter a cat or dog man?",
            answer: "Cat",
            guess1: "Dog",
            guess2: "Lizard",
            guess3: "Bird"
        },
        {
            question: "Is Nomin mean to Peter and Keiyon?",
            answer: "Terrifyingly so",
            guess1: "Yeah, I guess...",
            guess2: "No",
            guess3: "Nomin? Never."
        },
        {
            question: "What is the best number?",
            answer: "3125",
            guess1: "42",
            guess2: "100",
            guess3: "99"
        }
    ];

    function randomizer(str1, str2, str3, str4) {
        var switchNum = Math.floor(Math.random() * 14) + 1;
        var arr = [];
        switch (switchNum) {
            case 1:
                arr.push(str1);
                arr.push(str2);
                arr.push(str3);
                arr.push(str4);
                break;
            case 2:
                arr.push(str1);
                arr.push(str2);
                arr.push(str4);
                arr.push(str3);
                break;
            case 3:
                arr.push(str1);
                arr.push(str3);
                arr.push(str2);
                arr.push(str4);
                break;
            case 4:
                arr.push(str2);
                arr.push(str1);
                arr.push(str3);
                arr.push(str4);
                break;
            case 5:
                arr.push(str1);
                arr.push(str4);
                arr.push(str3);
                arr.push(str2);
                break;
            case 6:
                arr.push(str1);
                arr.push(str4);
                arr.push(str2);
                arr.push(str3);
                break;
            case 7:
                arr.push(str4);
                arr.push(str3);
                arr.push(str2);
                arr.push(str1);
                break;
            case 8:
                arr.push(str4);
                arr.push(str2);
                arr.push(str3);
                arr.push(str1);
                break;
            case 9:
                arr.push(str3);
                arr.push(str2);
                arr.push(str1);
                arr.push(str4);
                break;
            case 10:
                arr.push(str3);
                arr.push(str2);
                arr.push(str4);
                arr.push(str1);
                break;
            case 11:
                arr.push(str4);
                arr.push(str1);
                arr.push(str2);
                arr.push(str3);
                break;
            case 12:
                arr.push(str3);
                arr.push(str4);
                arr.push(str1);
                arr.push(str2);
                break;
            case 13:
                arr.push(str4);
                arr.push(str3);
                arr.push(str1);
                arr.push(str2);
                break;
            case 14:
                arr.push(str1);
                arr.push(str3);
                arr.push(str4);
                arr.push(str2);
                break;
        }
        return arr;
    }

    function submitAnswers() {
        var rights = $(".rightAns");
        var correct = 0;
        console.log(rights);
        for (var r in rights) {
            if(rights[r].checked) {
                correct++;
            }
        }
        $(".correct").attr("style", "background-color: lime;");
        var total = 10;
        $("#right-wrong").text("You got " + correct + " right out of " + total + "...Peter would have done better, though.");
        clearInterval(countdown);
    }

    var timer = 120;
    var timerRunning = false;
    var clicked = false;
    var countdown;

    $("#start-trivia").on('click', function () {
        console.log("Clicked");
        if (!timerRunning) {
            countdown = setInterval(function () {
                $("#timer").text("You have " + timer + " seconds left!");
                timer--;
                if (timer <= 0) {
                    submitAnswers();
                }
            }, 1000);
            timerRunning = true;
        }

        if (!clicked) {
            for (var q in questionAnswer) {
                var question = questionAnswer[q].question;
                var answer = questionAnswer[q].answer;
                var guesses = randomizer(questionAnswer[q].answer, questionAnswer[q].guess1, questionAnswer[q].guess2, questionAnswer[q].guess3);
                var fieldset = $("<fieldset>");
                var ques = $("<p>").text(question);
                fieldset.append(ques);
                for (var g in guesses) {
                    var radio = $("<input>").attr("type", "radio").attr("value", guesses[g]).attr("name", "group" + q);
                    var span = $("<span>").text(guesses[g]).attr("class", "questionGuess");
                    if (radio.val() == answer) {
                        radio.attr("class", "rightAns");
                        span.attr("class", "correct");
                    } else {
                        radio.attr("class", "wrongAns");
                    }
                    var br = $("<br>");
                    fieldset.append(radio, span, br);
                }
                $("#trivia-form").prepend(fieldset);
            }
            $("#submit-trivia").attr("style", "display: visible");
            clicked = true;
        }
    });

    $("#submit-trivia").on("click", function (e) {
        e.preventDefault();
        console.log("ran");
        submitAnswers();
    });
});
$(document).ready(function () {
    var fileInput = $('#files');
    var uploadButton = $('#sean');

    uploadButton.on('click', function () {
        if (!window.FileReader) {
            alert('Your browser is not supported')
        }
        var input = fileInput.get(0);

        // Create a reader object
        var reader = new FileReader();
        if (input.files.length) {
            var textFile = input.files[0];
            reader.readAsText(textFile);
            $(reader).on('load', processFile);
        } else {
            alert('Please upload a file before continuing')
        }
    });

    $('#jBold').click(function () {
        var clauseNumber = document.getElementById('keypadDisplay').value;
        var firstSpan = "<span class=subscript>";
        var secondSpan = "</span>";

        var newClause = firstSpan.concat(clauseNumber, secondSpan);

        document.execCommand('insertHTML', true, newClause);
    });

    function processFile(e) {
        var file = e.target.result,
            results;
        if (file && file.length) {
            results = file;
            $('#name').val(results)
            //$('#name').val(results[1]);
        }
    }

    var keypad_bracket_l = "(",
        keypad_bracket_r = ")",
        keypad_value = "";

    function keypadAddDigit(v) {
        keypad_value += v;
        document.getElementById('keypadDisplay').value =
            keypad_bracket_l + keypad_value + keypad_bracket_r;
    }

    function keypadClear() {
        keypad_value = "";
        document.getElementById('keypadDisplay').value =
            keypad_bracket_l + keypad_value + keypad_bracket_r;
    }

    function keypadRoundBrackets() {
        keypad_bracket_l = "(";
        keypad_bracket_r = ")";
        document.getElementById('keypadDisplay').value =
            keypad_bracket_l + keypad_value + keypad_bracket_r;
    }

    function keypadSquareBrackets() {
        keypad_bracket_l = "[";
        keypad_bracket_r = "]";
        document.getElementById('keypadDisplay').value =
            keypad_bracket_l + keypad_value + keypad_bracket_r;
    }


    function addKeypadEvent(element, evnt, funct) {
        if (element.attachEvent)
            return element.attachEvent('on' + evnt, funct);
        else
            return element.addEventListener(evnt, funct, false);
    }

    //
    // add the event handlers to the keypad button elements
    //
    addKeypadEvent(document.getElementById('keypad_x'), 'click', function () {
        keypadAddDigit('x');
    });
    addKeypadEvent(document.getElementById('keypad_v'), 'click', function () {
        keypadAddDigit('v');
    });
    addKeypadEvent(document.getElementById('keypad_i'), 'click', function () {
        keypadAddDigit('i');
    });
    addKeypadEvent(document.getElementById('keypad_9'), 'click', function () {
        keypadAddDigit(9);
    });
    addKeypadEvent(document.getElementById('keypad_8'), 'click', function () {
        keypadAddDigit(8);
    });
    addKeypadEvent(document.getElementById('keypad_7'), 'click', function () {
        keypadAddDigit(7);
    });
    addKeypadEvent(document.getElementById('keypad_6'), 'click', function () {
        keypadAddDigit(6);
    });
    addKeypadEvent(document.getElementById('keypad_5'), 'click', function () {
        keypadAddDigit(5);
    });
    addKeypadEvent(document.getElementById('keypad_4'), 'click', function () {
        keypadAddDigit(4);
    });
    addKeypadEvent(document.getElementById('keypad_3'), 'click', function () {
        keypadAddDigit(3);
    });
    addKeypadEvent(document.getElementById('keypad_2'), 'click', function () {
        keypadAddDigit(2);
    });
    addKeypadEvent(document.getElementById('keypad_1'), 'click', function () {
        keypadAddDigit(1);
    });
    addKeypadEvent(document.getElementById('keypad_0'), 'click', function () {
        keypadAddDigit(0);
    });
    addKeypadEvent(document.getElementById('keypad_r'), 'click', function () {
        keypadRoundBrackets();
    });
    addKeypadEvent(document.getElementById('keypad_s'), 'click', function () {
        keypadSquareBrackets();
    });
    addKeypadEvent(document.getElementById('keypad_clear'), 'click', function () {
        keypadClear();
    });



    //This is for saving the updated assignment with clauses back to the server
    $('#saveClause').click(function () {
        var username = document.getElementById('postUserName').innerHTML;
        var clauseTitle = document.getElementById('modalTitle').innerHTML;
        var clauseDescription = document.getElementById('modalDescription').innerHTML;
        var clauseText = document.getElementById('modalText').innerHTML;

        $.ajax({
            url: "http://localhost:3000/classes/updateAssignment",
            type: "post",
            dataType: "json",
            data: {
                username: username,
                title: clauseTitle,
                description: clauseDescription,
                text: clauseText
            },
            cache: false,
            complete: function () {
                console.log("complete");
            },
            success: function () {
                alert("Assignment Updated");
            },
            error: function () {
                console.log("Process Error");
            }

        });
        alert("Assignment Updated");
    });

    var obj; //used to store annotation instance


});

// START : Loading username to the dashboard after login 
function getUsername() {
    localStorage.removeItem("username");
    var username = document.getElementById("username").value;
    localStorage.setItem("username", username);

}

function usernameOnLoad() {
    document.getElementById("postUserName").innerHTML = localStorage.getItem("username");
    document.getElementById("username2").value = localStorage.getItem("username");
}
// END 


function modalClauses(x) {
    var index = x.rowIndex;
    var table = document.getElementById('assignmentsTable');
    //alert(table.rows[index].cells[3].innerText);
    var contentArray = table.rows[index];

    document.getElementById('modalTitle').innerHTML = contentArray.cells[3].innerHTML;
    document.getElementById('modalDescription').innerHTML = contentArray.cells[6].innerHTML;
    document.getElementById('modalText').innerHTML = contentArray.cells[5].innerHTML;
}

function modalAnnotations(x) {
    var index = x.rowIndex;
    var table = document.getElementById('assignmentsTable');
    //alert(table.rows[index].cells[3].innerText);
    var contentArray = table.rows[index];

    document.getElementById('annotationTitle').innerHTML = contentArray.cells[3].innerHTML;
    document.getElementById('annotationDescription').innerHTML = contentArray.cells[6].innerHTML;
    document.getElementById('annotationText').innerHTML = contentArray.cells[5].innerHTML;

    document.getElementById('annotationTitle').innerHTML = contentArray.cells[3].innerHTML;
    document.getElementById('annotationDate').innerHTML = contentArray.cells[4].innerHTML;
    document.getElementById('annotationModule').innerHTML = contentArray.cells[1].innerHTML;
    annotatateToolStart();//this will start annotator.js in CM project
}

function modalStudentAssignment(x) {
    var index = x.rowIndex;
    var table = document.getElementById('assignmentsTable');
    var contentArray = table.rows[index];
    console.log(index + " " + contentArray)
    document.getElementById('modalTitle').innerHTML = contentArray.cells[3].innerHTML;
    document.getElementById('modalDescription').innerHTML = contentArray.cells[6].innerHTML;
    document.getElementById('modalText').innerHTML = contentArray.cells[5].innerHTML;
}

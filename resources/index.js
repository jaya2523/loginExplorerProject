var jpdbBaseURL = 'http://api.login2explore.com:5577'
var jpdbIML = '/api/iml'
var studentDBName = 'STUDENT-TABLE'
var studentRelationName = 'SCHOOL-DB"'
var connToken = "90931961|-31949303082797231|90960515"

$(document).ready(function() {
    $("#rollNo").focus();

    function validateAndGetFormData() {
        var rollNoVar = $("#rollNo").val();
        if (rollNoVar === "") {
            alert("Roll-No is a required value");
            $("#rollNo").focus();
            return null;
        }

        var fullNameVar = $("#fullName").val();
        if (fullNameVar === "") {
            alert("Full Name is a required value");
            $("#fullName").focus();
            return null;
        }

        var divisionVar = $("#division").val();
        if (divisionVar === "") {
            alert("Student Class is a required value");
            $("#division").focus();
            return null;
        }

        var birthDateVar = $("#birthDate").val();
        if (birthDateVar === "") {
            alert("Student Birth-Date is a required value");
            $("#birthDate").focus();
            return null;
        }

        var addressVar = $("#address").val();
        if (addressVar === "") {
            alert("Student Address is a required value");
            $("#address").focus();
            return null;
        }

        var enrollVar = $("#enroll").val();
        if (enrollVar === "") {
            alert("Student Enrollment-Date is a required value");
            $("#enroll").focus();
            return null;
        }

        var jsonStrObj = {
            rollNo: rollNoVar,
            fullName: fullNameVar,
            division: divisionVar,
            birthDate: birthDateVar,
            address: addressVar,
            enroll: enrollVar
        };

        return JSON.stringify(jsonStrObj);
    }

    function createPUTRequest(connToken, jsonObj, dbName, relName) {
        var putRequest = {
            token: connToken,
            dbName: dbName,
            cmd: "PUT",
            rel: relName,
            jsonStr: jsonObj
        };
        return JSON.stringify(putRequest);
    }

    function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
        var url = dbBaseUrl + apiEndPointUrl;
        var jsonObj;

        $.ajax({
            type: "POST",
            url: url,
            data: reqString,
            async: false, // This is set to false to ensure synchronous execution
            success: function(result) {
                jsonObj = JSON.parse(result);
            },
            error: function(result) {
                var dataJsonObj = result.responseText;
                jsonObj = JSON.parse(dataJsonObj);
            }
        });

        return jsonObj;
    }

    function resetForm() {
        $("#rollNo, #fullName, #division, #birthDate, #address, #enroll").val("");
        $("#rollNo").focus();
    }

    function saveStudent() {
        var jsonStr = validateAndGetFormData();
        if (!jsonStr) {
            return;
        }

        var putReqStr = createPUTRequest(connToken, jsonStr, studentDBName, studentRelationName);
        alert(putReqStr);
        
        var resultObj = executeCommand(putReqStr, jpdbBaseURL, jpdbIML);
        alert(JSON.stringify(resultObj));

        resetForm();
    }

    // Event listener for the form submission
    $("#submitButton").on("click", function(e) {
        e.preventDefault();
        saveStudent();
    });
});
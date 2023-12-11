// Initialization of basic data and auxiliary variables
var firstName;
var lastName;
var street;
var city;
var country;
const regFirstLastName = /^[A-ZČĆŽŠĐa]{1}[a-zčćžšđ]{2,14}$/u;
const regCityCountry = /\b[A-ZČĆŽŠĐ][A-ZČĆŽŠĐa-zčćžšđ]{2,30}(?: [A-ZČĆŽŠĐ][A-ZČĆŽŠĐa-zčćžšđ]*)*\b/u;
const regStreet = /^([A-ZČĆŽŠĐ]|[1-9]{1,7})[A-ZČĆŽŠĐa-zčćžšđ\d\-\.\s]+$/u;
var isDisabledSubmitButton = true;
var inputs = [];
const CONSTANTS = {
    API: "http://localhost/api-test-posao/",
    USER: "user"
};

// Set values of input elements and error message element to variables for easier access
document.addEventListener('DOMContentLoaded', function () {
    firstName = $("#firstName");
    lastName = $("#lastName");
    street = $("#street");
    country = $("#country");
    city = $("#city");
    inputs = [
        {
            element: firstName,
            regex: regFirstLastName,
            errorMessage: "The first name must contain at least 3 letters and must begin with a capital letter"
        },
        {
            element: lastName,
            regex: regFirstLastName,
            errorMessage: "The last name must contain at least 3 letters and must begin with a capital letter"
        },
        {
            element: street,
            regex: regStreet,
            errorMessage: "Street and number are required data"
        },
        {
            element: city,
            regex: regCityCountry,
            errorMessage: "The first letter must be capitalized. The value must not be shorter than 3 characters"
        },
        {
            element: country,
            regex: regCityCountry,
            errorMessage: "The first letter must be capitalized. The value must not be shorter than 3 characters"
        },
    ];

    addValidators();
})

// Add 'keyup' event to all form elements for validation
function addValidators() {
    $("#submit").click(()=>{ submit() })
    inputs.forEach(e => { e.element.keydown(() => { validateInput(e.element, e.regex, e.errorMessage) }) })
    inputs.forEach(e => { e.element.blur(() => { validateInput(e.element, e.regex, e.errorMessage) }) })
}

// Validate a single form field
function validateInput(input, regex, errorMessage) {
    const errorElement = input.parent().find(".error-message");
    if (regex.test(input.val())) {
        errorElement.removeClass("d-block");
        errorElement.addClass("d-none");
        errorElement.find("p").html("");
        input.removeClass("input-error");
        enableDisableForm();
    } else {
        errorElement.addClass("d-block");
        errorElement.removeClass("d-none");
        errorElement.find("p").html(errorMessage);
        input.addClass("input-error");
        enableDisableForm();
    }
    $("#successed").text("");
    $("#map").height($("#left-wrapper").height());
}

// Check if all form fields are filled correctly, enable form if they are
function enableDisableForm() {
    let x = 0; // numerator
    inputs.forEach(e => {
        if (!e.regex.test(e.element.val())) {
            x++;
            disableSubmitButton();
        }
    })
    if (x == 0) {
        enableSubmitButton();
    }
}

// Disable form submission
function disableSubmitButton() {
    $("#submit").attr("disabled", true);
    $("#submit").addClass("disabled-bg");
    $("#submit").addClass("cursor-block")
    $("#submit").removeClass("cursor-pointer")
    $("#submit").removeClass("bg-blue")
    $("#submit").addClass("bg-grey")
    isDisabledSubmitButton = true;
}

// Enable form submission
function enableSubmitButton() {
    $("#submit").removeAttr("disabled")
    $("#submit").removeClass("disabled-bg")
    $("#submit").removeClass("cursor-block")
    $("#submit").addClass("cursor-pointer")
    $("#submit").removeClass("bg-grey")
    $("#submit").addClass("bg-blue")
    isDisabledSubmitButton = false;
}

// Sending the data form to the server
function submit()
{
    if(!isDisabledSubmitButton)
    {
        $.ajax({
            url: CONSTANTS.API + CONSTANTS.USER,
            method: 'POST',
            dataType: 'json',
            data:{
                "firstName": firstName.val(),
                "lastName": lastName.val(),
                "street": street.val(),
                "city": city.val(),
                "country": country.val(),
            },
            success: function (data) {
                SuccessAddedUser(); //Notification that the User has been successfully added
            },
            error: function (error) {
                console.error('Unfortunately, there was an error on the server, please try again later.');
            }
        });
    }
}

//Notification that the User has been successfully added
function SuccessAddedUser()
{
    inputs.forEach(e=>{
        e.element.val("");
        e.element.parent().find("p").text("");
    })
    $("#successed").text("User has been successfully added!");
}

// Find the current path the user is on
var currentPath = window.location.pathname;
var parts = currentPath.split('/');
var lastPart = parts[parts.length - 1];
var path = lastPart.replace('.html', '');


if (path === 'table') // If the current path is "table", load table-related functions
{
    loadTableData(); // Load data into the global variable.
}

// Fetch data about all users. Send an AJAX request to the server.
function loadTableData() {
    $.ajax({
        url: CONSTANTS.API + CONSTANTS.USER,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            writeDataInTable(data); // Call the function that writes data into the table
        },
        error: function (error) {
            console.error('Unfortunately, there was an error on the server, please try again later.');
        }
    });
}

// Write user data into the HTML table.
function writeDataInTable(tableData) {
    var html = ``;
    tableData.forEach(e => {
        html += ` <tr>
                    <td>${e.firstName}</td>
                    <td>${e.lastName}</td>
                    <td>${e.country}</td>
                    <td>${e.city}</td>
                    <td>${e.street}</td>
                </tr>`;
    });
    $("tbody").html(html);
}

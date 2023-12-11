// Inicijalizacija osnovnih podataka, kao i pomocnih promenljivih
var firstName;
var lastName;
var street ;
var city;
var country;
const regFirstLastName = /^[A-ZČĆŽŠĐa]{1}[a-zčćžšđ]{2,14}$/;
const regCityCountry = /\b[A-Z][a-zA-Z]{2,30}(?: [A-Z][a-zA-Z]*)*\b/; 
const regStreet = /^([A-ZČĆŽŠĐ]|[1-9]{1,7})[A-ZČĆŽŠĐa-zčćžšđ\d\-\.\s]+$/;
var isDiabledSubmitButton = true;
var inputs = [];
const CONSTANTS = {
    API:"http://localhost/api-test-poso/",
    USER:"user"
}

// Set vrednosti input elementa i elementa za ispisivanje greske u variablu, kako bi se kasnije lakse pristupalo podacima i greskama
document.addEventListener('DOMContentLoaded', function()
{
    firstName = $("#firstName");
    lastName = $("#lastName");
    street = $("#street");
    country = $("#country");
    city = $("#city");
    inputs = [
        {
            element:firstName,
            regex:regFirstLastName,
            erroMessage:"The fist name must contain at least 3 letters and must begin with a capital letter"
        },
        {
            element:lastName,
            regex:regFirstLastName,
            erroMessage:"The last name must contain at least 3 letters and must begin with a capital letter"
        },
        {
            element:street,
            regex:regStreet,
            erroMessage:"Street and number is required data"
        },
        {
            element:city,
            regex:regCityCountry,
            erroMessage:"The first letter must be capitalized. The value must not be shorter than 3 characters"
        },
        {
            element:country,
            regex:regCityCountry,
            erroMessage:"The first letter must be capitalized. The value must not be shorter than 3 characters"
        },
    ];

    addValiadtors();
})

//Dodavanje dogadjaja 'keyup' svim elementima forme kako bi se vrisla validacija vrednosti tih polja
function addValiadtors()
{
    inputs.forEach(e=>{e.element.keydown(()=>{ validateInput(e.element,e.regex,e.erroMessage) })})
    inputs.forEach(e=>{e.element.blur(()=>{ validateInput(e.element,e.regex,e.erroMessage) })})
}

//Provera samo jednog polja forme
function validateInput(input,regex,erroMessage)
{
    const errorElement = input.parent().find(".error-message");
    if(regex.test(input.val()))
    {
        errorElement.removeClass("d-block");
        errorElement.addClass("d-none");
        errorElement.find("p").html("");
        input.removeClass("input-error");
        enableDisableForm();
    }
    else
    {
        errorElement.addClass("d-block");
        errorElement.removeClass("d-none");
        errorElement.find("p").html(erroMessage);
        input.addClass("input-error");
        enableDisableForm();
    }
    
    $("#map").height($("#left-wrapper").height());
}

//provera da li su apsolutno sva polja forme ispravno popunjena, ukoliko jesu fomra je enable
function enableDisableForm()
{
    let x = 0; // numerator
    inputs.forEach(e=>{
        if(!e.regex.test(e.element.val()))
        {
            x++;
            disableSubmitButton();
        }
    })
    if(x==0)
    {
        enableSubmitButton();
    }
}

//Onemogucavanje submita forme
function disableSubmitButton()
{
        $("#submitBtn").attr("disabled", true);
        $("#submitBtn").addClass("disabled-bg");
        $("#submitBtn").addClass("cursor-block")  
        $("#submitBtn").removeClass("cursor-pointer")  
        isDiabledSubmitButton = true;
}

//Omogucavanje submita forme
function enableSubmitButton()
{
        $("#submitBtn").removeAttr("disabled")
        $("#submitBtn").removeClass("disabled-bg")  
        $("#submitBtn").removeClass("cursor-block")  
        $("#submitBtn").addClass("cursor-pointer")  
        isDiabledSubmitButton = false;
}

// pronalazenje trenutne putanje na kojoj se korisnik nalazi.
var currentPath = window.location.pathname;
var parts = currentPath.split('/');
var lastPart = parts[parts.length - 1];
var path = lastPart.replace('.html', ''); 
const tableData = [
    {
      "firstName": "Emma",
      "lastName": "Johnson",
      "city": "New York",
      "country": "New York",
      "street": "Broadway 123"
    },
    {
      "firstName": "Liam",
      "lastName": "Williams",
      "city": "Los Angeles",
      "country": "California",
      "street": "Hollywood Blvd 456"
    },
    {
      "firstName": "Olivia",
      "lastName": "Smith",
      "city": "Chicago",
      "country": "Illinois",
      "street": "Michigan Ave 789"
    },
    {
      "firstName": "Noah",
      "lastName": "Brown",
      "city": "Houston",
      "country": "Texas",
      "street": "Main St 101"
    },
    {
      "firstName": "Ava",
      "lastName": "Davis",
      "city": "Phoenix",
      "country": "Arizona",
      "street": "Grand Ave 202"
    },
    {
      "firstName": "Sophia",
      "lastName": "Wilson",
      "city": "Philadelphia",
      "country": "Pennsylvania",
      "street": "Chestnut St 303"
    },
    {
      "firstName": "Jackson",
      "lastName": "Taylor",
      "city": "San Antonio",
      "country": "Texas",
      "street": "River Walk 404"
    },
    {
      "firstName": "Isabella",
      "lastName": "Anderson",
      "city": "San Diego",
      "country": "California",
      "street": "Gaslamp Quarter 505"
    },
    {
      "firstName": "Liam",
      "lastName": "Moore",
      "city": "Dallas",
      "country": "Texas",
      "street": "Deep Ellum 606"
    },
    {
      "firstName": "Ava",
      "lastName": "Martin",
      "city": "San Francisco",
      "country": "California",
      "street": "Lombard St 707"
    }
  ]

if (path === 'table') // Ukoliko je trenutna putanja "table" ucitace se funkcije za rad sa tabelom.
{
    loadTableData(tableData); // Ucitvanje podataka u globalnu promenljivu.
} 

//Dohvatanje podataka o svim korisnicima. Slanje ajax zahteva ka serveru.
function loadTableData(){
    $.ajax({
        url: CONSTANTS.API + CONSTANTS.USER,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            writeDataInTable(data); // Poziv funkcije koje vrsi ispisivanje podataka u formi table
        },
        error: function(error) {
          console.error('Unfortunately, there was an error on the server, please try again later.');
        }
      });
}

// Ispisivanje podataka o korisnicima u html tabelu.
function writeDataInTable(tableData){
    var html = ``;
    tableData.forEach(e=>{
        html+=` <tr>
                    <td>${e.firstName}</td>
                    <td>${e.lastName}</td>
                    <td>${e.country}</td>
                    <td>${e.city}</td>
                    <td>${e.street}</td>
                </tr>`
    });
    $("tbody").html(html);
}



  

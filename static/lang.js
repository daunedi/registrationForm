function changeLanguage(lang){
    location.hash = lang;
    location.reload();
}
var language = {
    hr:{
        welcome: "Registracija novih korisnika",
        name: "IME TVRTKE",
        contact: "KONTAKT OSOBA",
        devNum: "BROJ MOBILNIH UREĐAJA",
        button: "POŠALJI",
        login: "Prijava korisnika",
        loginButton: "PRIJAVA",
        loginUser: "KORISNIČKO IME",
        loginPass: "LOZINKA",
        submitted: "USPJEŠNA REGISTRACIJA"
    }
}
var siteTitle = document.getElementById("formTitle");
var compName = document.getElementById("companyName");
var contact = document.getElementById("contact");
var deviceNumber = document.getElementById("deviceNumber");
var buttonSend = document.getElementById("formButton");
var loginTitle = document.getElementById("formTitleLogin");
var loginButt = document.getElementById("formButtonLogin");
var loginUsername = document.getElementById("userName");
var loginPassword = document.getElementById("password");
var titleSubmitted = document.getElementById("formTitleSubmit")

if(window.location.hash){
    if(window.location.hash == "#hr"){
        siteTitle.textContent = language.hr.welcome;
        compName.placeholder = language.hr.name;
        contact.placeholder = language.hr.contact;
        deviceNumber.placeholder = language.hr.devNum;
        buttonSend.value = language.hr.button;
        loginTitle.textContent = language.hr.login;
        loginButt.value = language.hr.loginButton;
        loginUsername.placeholder = language.hr.loginUser;
        loginPassword.placeholder = language.hr.loginPass;
        titleSubmitted.textContent = language.hr.titleSubmitted;
    }
}
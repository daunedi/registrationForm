function changeLanguage(lang){
    location.hash = lang;
    location.reload();
}
var language = {
    eng:{
        welcome: "New user registration",
        name: "COMPANY NAME",
        contact: "CONTACT NAME",
        devNum: "NUMBER OF DEVICES",
        button: "SEND",
    }
}
var siteTitle = document.getElementById("formTitle");
var compName = document.getElementById("companyName");
var contact = document.getElementById("contact");
var deviceNumber = document.getElementById("deviceNumber");
var buttonSend = document.getElementById("formButton");

if(window.location.hash){
    if(window.location.hash == "#eng"){
        siteTitle.textContent = language.eng.welcome;
        compName.placeholder = language.eng.name;
        contact.placeholder = language.eng.contact;
        deviceNumber.placeholder = language.eng.devNum;
        buttonSend.value = language.eng.button;
    }
}
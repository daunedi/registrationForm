window.onload=function(){
    fetch('/login', {method: 'GET'})
    createUserTable();
    //falseLogIn();
}

function falseLogIn(){
    let tableTitle = document.getElementById('formTitleUsers');
    tableTitle.innerHTML = "Unsuccessfull login. Try again.";
}

function createUserTable(){
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('body').appendChild(table);

    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Company";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Contact";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Email";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "Identity provider";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "Device number";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    thead.appendChild(row_1);
}


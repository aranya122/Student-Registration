var registrationform = document.querySelector("#registration-form");
var allInput = registrationform.querySelectorAll("INPUT");
var addBtn = document.querySelector("#add-btn");
var model = document.querySelector(".model");
var closeBtn = document.querySelector(".close-icon");
addBtn.onclick = function () {
    model.classList.add("active");
}
closeBtn.addEventListener("click", () => {
    model.classList.remove("active");
    var i;
    for(i=0; i<allInput.length;i++){
        allInput[i].value = "";
    }


})
 //start all global variable//

var userData = [];
var idEl = document.getElementById("id");
var nameEl = document.querySelector("#name");
var contactEl = document.querySelector("#contact");
var emailEl = document.querySelector("#email");
var subjectEl = document.querySelector("#subject");
var registrationform = document.querySelector("#registration-form");
var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-btn");

//end all global variable//


registerBtn.onclick = function (e) {
    e.preventDefault();
    registrationData();
    getDataFromLocal();
    registrationform.reset('');
    closeBtn.click();



}
if (localStorage.getItem("userData") != null) {
    userData = JSON.parse(localStorage.getItem("userData"));

}



function registrationData() {
    userData.push({
        id: idEl.value,
        name: nameEl.value,
        contact: contactEl.value,
        subject: subjectEl.value,
        email: emailEl.value,
        
    });

    var userString = JSON.stringify(userData);
    localStorage.setItem("userData", userString);
    swal("Good job!", "Registration Successfully", "success");
}

var tableData = document.querySelector("#table-data");
const getDataFromLocal= () => {
    tableData.innerHTML = "";
    userData.forEach((data,index) => {
        tableData.innerHTML += `
        <tr index = '${index}'>
        <td>${index + 1}</td>
        <td>${data.name}</td>
        <td>${data.id}</td> 
        <td>${data.contact}</td>
        <td>${data.subject}</td>
        <td>${data.email}</td>  
        <td>
            <button class="edit-btn"><i class="fa fa-eye"></i></button>
            <button class="del-btn"><i class="fa fa-trash"></i></button>
        </td>


    </tr>
   `;


    });

    //delete coding

    var i;
    var allDelBtn = document.querySelectorAll(".del-btn")
    for(i=0;i<allDelBtn.length;i++){
        allDelBtn[i].onclick = function() {
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            userData.splice(id,1);
            localStorage.setItem("userData", JSON.stringify(userData));
            
            tr.remove();

        }
    }

    //update coding
     var allEdit = document.querySelectorAll(".edit-btn");
     for(i=0; i<allEdit.length;i++) {
        allEdit[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("TD");
            var index = tr.getAttribute("index");
            var name = td[1].innerHTML;
            var id = td[2].innerHTML;
            var contact = td[3].innerHTML;
            var subject = td[4].innerHTML;
            var email = td[5].innerHTML;
            addBtn.click();
            registerBtn.disabled = true;
            updateBtn.disabled = false;
            
            nameEl.value = name;
            idEl.value = id;
            contactEl.value = contact;
            subjectEl.value = subject;
            emailEl.value = email;
            updateBtn.onclick = function(e){
                userData[index] = {
                    id: idEl.value,
                    name: nameEl.value,
                    contact: contactEl.value,
                    subject: subjectEl.value,
                    email: emailEl.value,
                }
                localStorage.setItem("userData",JSON.stringify(userData));
            }

            


        }
    }











}
getDataFromLocal();

//search coding
var searchEl = document.querySelector("#studentId");
searchEl.oninput = function(){
    searchfun();
}
function searchfun(){
    var tr = tableData.querySelectorAll("TR");
    var filter = searchEl.value.toLowerCase();
    var i;
    for(i=0;i<tr.length;i++){
        var td =tr[i].getElementsByTagName("TD")[2];
        var id = td.innerHTML;
        if(id.toLowerCase().indexOf(filter) >-1){

            tr[i].style.display = "";
        }else{
            tr[i].style.display = "none";
        }
    }
}






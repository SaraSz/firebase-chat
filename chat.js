window.onload = function () {"use strict";
    
let username = document.getElementById("username"); //Skriva in användarnamn
let loginbtn = document.getElementById("loginbtn"); //Logga in-knapp
let logoutbtn = document.getElementById("logoutbtn");//Logga ut-knapp
let op = document.getElementById("output");          //Text i header som välkomnar användare
let write = document.getElementById("write");        //Det meddelande man skriver 
let msgbox = document.getElementById("msgbox");      //Meddelandefönstret där allt hamnar
let submit = document.getElementById("submit");      //Skicka meddelande-knapp
let view = document.getElementById("view");          //Visa meddelanden-knapp
var table = document.getElementById("table");       //Tabell
    
let totalmsg = 0;
let user = localStorage.getItem("username");

                             
/**********Welcome "name" ******************/                            
    
loginbtn.addEventListener("click", function(event){
    user = username.value;
    op.innerHTML = "Welcome to your chat, " + user + "!";
    localStorage.setItem("username", user); //Lagrar användaren i localStorage
    console.log("Lagt till användarnamn " + user);
    username.value = "";  
    loginbtn.disabled = true;  
    
});
                            
/**********Log out************************/
                       
logoutbtn.addEventListener("click", function(event){
    localStorage.removeItem("username", user); //Tar bort användaren från localStorage
    console.log("Loggat ur användare");
    op.innerHTML = "You are logged out."; 
    loginbtn.disabled = false;    
    
}); 

                             
/***********Write messages***************/      
    
submit.addEventListener("click", function(event) {
    console.log("Text: " + write.value + " hamnar i div");
        
totalmsg++;
let time = new Date(new Date().getTime()).toLocaleString();

let fb = firebase.database();

fb.ref("messages/" + totalmsg).set({
    name: user,
    message: write.value,
    id: totalmsg,
    time: time
				})
write.value = "";
    
 fb.ref().child("messages").once("value",function(snapshot){
  let data = snapshot.val();
  let count = Object.keys(data).length;
    });
});

    
    
/************View messages***************/
    
view.addEventListener("click", function(event){
table.innerHTML = "";
    
    firebase.database().ref("messages/").once("value", function(snapshot) {
	let allData = snapshot.val();
        Object.keys(allData).reverse().forEach(function(key){
    let messages = allData[key];
            
    let tr = document.createElement("tr");
tr.innerHTML = messages.name + "<td>" + messages.message + "<td>" + messages.time + "<td>" + messages.id;
            table.appendChild(tr);
 
             
        })
	
        
});

});
    
}
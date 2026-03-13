
let admin = false

function login(){

let user=document.getElementById("username").value
let pass=document.getElementById("password").value

if(user==="admin" && pass==="shivam"){
admin=true
afterLogin()
return
}

let users=JSON.parse(localStorage.getItem("users"))||[]

let found=users.find(u=>u.user===user && u.pass===pass)

if(found){
afterLogin()
}else{
alert("Wrong login")
}

}

function register(){

let user=document.getElementById("ruser").value
let pass=document.getElementById("rpass").value
let email=document.getElementById("remail").value
let phone=document.getElementById("rphone").value

let users=JSON.parse(localStorage.getItem("users"))||[]

users.push({user,pass,email,phone})

localStorage.setItem("users",JSON.stringify(users))

alert("Registered")
}

function afterLogin(){

document.getElementById("loginBtn").style.display="none"
document.getElementById("menu").classList.remove("hidden")

if(admin){
document.getElementById("addBtn").classList.remove("hidden")
}

}

function logout(){
location.reload()
}

function openUpload(){
document.getElementById("uploadBox").classList.remove("hidden")
}

function upload(){

let title=document.getElementById("title").value
let file=document.getElementById("file").files[0]

let reader=new FileReader()

reader.onload=function(){

let mangas=JSON.parse(localStorage.getItem("mangas"))||[]

mangas.push({title,data:reader.result})

localStorage.setItem("mangas",JSON.stringify(mangas))

loadGallery()

}

reader.readAsDataURL(file)

}

function loadGallery(){

let gallery=document.getElementById("gallery")

gallery.innerHTML=""

let mangas=JSON.parse(localStorage.getItem("mangas"))||[]

mangas.forEach((m,i)=>{

let div=document.createElement("div")
div.className="card"

div.innerHTML=`<h3>${m.title}</h3>`

div.onclick=()=>openReader(m.data)

if(admin){

let del=document.createElement("button")
del.innerText="Delete"

del.onclick=(e)=>{
e.stopPropagation()

mangas.splice(i,1)

localStorage.setItem("mangas",JSON.stringify(mangas))

loadGallery()
}

div.appendChild(del)

}

gallery.appendChild(div)

})

}

function openReader(data){
window.open(data)
}

function toggleMenu(){
document.getElementById("menuBox").classList.toggle("hidden")
}

function scrollToSupport(){
document.getElementById("support").scrollIntoView()
}

document.getElementById("loginBtn").onclick=()=>{
document.getElementById("loginBox").classList.remove("hidden")
}

document.getElementById("search").oninput=function(){

let q=this.value.toLowerCase()

let cards=document.querySelectorAll(".card")

cards.forEach(c=>{

if(c.innerText.toLowerCase().includes(q)){
c.style.display="block"
}else{
c.style.display="none"
}

})

}

loadGallery()

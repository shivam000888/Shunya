let admin=false

function openLogin(){
document.getElementById("loginPopup").classList.remove("hidden")
}

function login(){

let user=document.getElementById("username").value
let pass=document.getElementById("password").value

if(user==="admin" && pass==="shivam"){
admin=true
document.getElementById("loginBtn").style.display="none"
document.getElementById("menu").classList.remove("hidden")
document.getElementById("uploadBtn").classList.remove("hidden")
document.getElementById("loginPopup").classList.add("hidden")
}

}

function logout(){
location.reload()
}

function openUpload(){
document.getElementById("uploadPopup").classList.remove("hidden")
}

function upload(){

let title=document.getElementById("title").value
let file=document.getElementById("image").files[0]

let reader=new FileReader()

reader.onload=function(){

let mangas=JSON.parse(localStorage.getItem("mangas"))||[]

mangas.push({
title:title,
img:reader.result
})

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

let card=document.createElement("div")
card.className="card"

card.innerHTML=`
<img src="${m.img}">
<h3>${m.title}</h3>
`

if(admin){

let del=document.createElement("button")
del.innerText="Delete"

del.onclick=(e)=>{
e.stopPropagation()

mangas.splice(i,1)

localStorage.setItem("mangas",JSON.stringify(mangas))

loadGallery()
}

card.appendChild(del)

}

gallery.appendChild(card)

})

}

function searchManga(){

let q=document.getElementById("search").value.toLowerCase()

let cards=document.querySelectorAll(".card")

cards.forEach(card=>{

if(card.innerText.toLowerCase().includes(q)){
card.style.display="block"
}else{
card.style.display="none"
}

})

}

function toggleMenu(){
document.getElementById("menuBox").classList.toggle("hidden")
}

function scrollSupport(){
document.getElementById("support").scrollIntoView()
}

loadGallery()

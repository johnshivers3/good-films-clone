// const { RequestHeaderFieldsTooLarge } = require("http-errors");

window.addEventListener("DOMContentLoaded", () => {

const deleteBtns = document.querySelectorAll(".delete-review-btn");
const editBtn = document.querySelector(".edit-review-btn");
const saveBtn = document.querySelector(".save-review-btn");

deleteBtns.forEach(button => {
    button.addEventListener('click', async (event) => {
    
        // const deleteBtn = document.getElementsByClassName("delete-review-btn")[0]
        
        let idNumber = event.target.id.split("-")[1]
        
        console.log(event.target.id)
        
        
        
        await fetch(`/profile/review/delete/${idNumber}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }  
        })
        
        location.reload()
    
        // const review = document.getElementById(`review-${idNumber}`)
        // review.innerHTML = ''
    
    
    
    });
});









});
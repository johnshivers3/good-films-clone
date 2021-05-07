const { RequestHeaderFieldsTooLarge } = require("http-errors");

window.addEventListener("DOMContentLoaded", () => {

const deleteBtn = document.querySelector(".delete-review-btn");
const editBtn = document.querySelector(".edit-review-btn");
const saveBtn = document.querySelector(".save-review-btn");


deleteBtn.addEventListener('click', (event) => {

    const review = document.querySelector(".review")

    const hello = await fetch(`/movies/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        
    })

    review.innerHTML = hello



});








});
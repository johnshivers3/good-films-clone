
window.addEventListener("DOMContentLoaded", () => {

const deleteBtns = document.querySelectorAll(".delete-review-btn");
const editBtns = document.querySelectorAll(".edit-review-btn");
const saveBtns = document.querySelectorAll(".save-review-btn");

deleteBtns.forEach(button => {
    button.addEventListener('click', async (event) => {
    
        // const deleteBtn = document.getElementsByClassName("delete-review-btn")[0]
        let idNumber = event.target.id.split("-")[1]
        
        
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

editBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        const input = document.createElement('input')

        let idNumber = event.target.id.split("-")[1]


        const appendHere = document.querySelectorAll(`#edits-${idNumber}`)
        let val = event.target.value

        input.setAttribute("type", "textarea")
        input.setAttribute("value", `${val}`)
        input.setAttribute("id", `update-textarea-${idNumber}`)

        appendHere.forEach(thing => {
            thing.append(input)  
        });

    });
});

saveBtns.forEach(button => {
    button.addEventListener('click', async (event) => {
    
        // const deleteBtn = document.getElementsByClassName("delete-review-btn")[0]
        
        let idNumber = event.target.id.split("-")[1]
        
        console.log(event.target.id)

        const updated = document.getElementById(`update-textarea-${idNumber}`)

        console.log(updated)
        
        await fetch(`/profile/review/edit/${idNumber}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }  
        })
        
        // const review = document.getElementById(`review-${idNumber}`)
        // review.innerHTML = ''
        
    });


});









});
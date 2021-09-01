
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

        let idNumber = event.target.id.split("-")[1]

        const input = document.getElementById(`edits-input-${idNumber}`)

        const appendHere = document.getElementById(`edits-${idNumber}`)
        const innerSpan = document.getElementById(`edits-content-${idNumber}`)

        // let val = event.target.value

        // input.setAttribute("type", "textarea")
        // input.setAttribute("value", `${val}`)
        // input.setAttribute("id", `update-textarea-${idNumber}`)

        // appendHere.forEach(thing => {
        //     thing.append(input)
        // });

        // const test = 

        innerSpan.classList.add('hidden')
        input.classList.remove('hidden')


        const saveButton = document.getElementById(`save-${idNumber}`)
        saveButton.classList.remove('hidden')

        const editButton = document.getElementById(`edit-${idNumber}`)
        editButton.classList.add('hidden')

    });
});

    saveBtns.forEach(button => {
        button.addEventListener('click', async (event) => {
            let idNumber = event.target.id.split("-")[1]

            const input = document.getElementById(`edits-input-${idNumber}`)


            const updated = input.value


            await fetch(`/profile/review/edit/${idNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: updated
                })
            })

            const updatedContent = document.getElementById(`edits-content-${idNumber}`)
            updatedContent.innerText = updated
            updatedContent.classList.remove('hidden')

            input.classList.add('hidden')

            const saveButton = document.getElementById(`save-${idNumber}`)
            saveButton.classList.add('hidden')

            const editButton = document.getElementById(`edit-${idNumber}`)
            editButton.classList.remove('hidden')
        });

    });









});

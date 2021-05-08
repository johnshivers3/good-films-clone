
document.addEventListener('DOMContentLoaded', () => {

    const liElements = document.getElementsByClassName('collectionListItems');
    console.log(liElements);
    if (liElements.length > 0) {
        document.getElementById('inCollectionsArea').classList.remove('hidden');
    }

    // ADDing to Collection
    document.querySelector('.addToCollection').addEventListener('click', async (event) =>{
        event.preventDefault();

        const collectionId = document.getElementById('collectionSelect').value;
        const movieId = document.getElementById('movieId').value;

        await fetch(`/profile/${collectionId}/${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'collectionId': collectionId,
                'movieId': movieId
            })
        })

        // add to list 
        const liElements = document.getElementsByClassName('collectionListItems');
        if (liElements.length === 0) {
            document.getElementById('inCollectionsArea').classList.add('show');
        }
        const li = document.createElement('li');
        li.setAttribute('id', `list-${collectionId}`)
        li.classList.add('collectionListItems')
        const option = document.getElementById(`drop-down-${collectionId}`);
        const collectionName = option.innerText
        li.innerText = collectionName;

        const button = document.createElement('button')
        button.setAttribute('id', `${collectionId}/${collectionName}/${movieId}`);
        button.innerText = "Remove"
        li.append(button);

        option.remove();
        
        document.getElementById('collectionList').append(li);


        // const div = document.getElementById('addToCollectionsDiv');
        // div.innerHTML = '';
    })


    document.getElementById('create-review').addEventListener('click', async (event) => {
        event.preventDefault();

        console.log('in event listener')

        const rating = document.getElementById('rating').value;
        const content = document.getElementById('content')
        const userId = document.getElementById('userId').value;
        const movieId = document.getElementById('movieId').value;
        const userName = document.getElementById('userName').value;


        const data = {
            rating,
            content: content.value,
            userId,
            movieId
        }

        const hello = await fetch(`/movies/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })

        const anything = await hello.json()
        const divToPrepend = document.getElementById("reviewsList");
        const newReview = document.createElement("div")
        // const reviewList = document.getElementsByClassName(".reviewsList");

        const date = new Date();
        const datePlus = `${date.toDateString()}`

        newReview.innerHTML = `
        <div class="movieInfo review-area">
            <div class="userAndDate">
                <div>
                    <label>User: </label>
                    <span>${userName}</span>
                </div>
                <div>
                    <label>Date: </label>
                    <span>${datePlus}</span>
                </div>
            </div>
            <div class="reviewContent">
                <p>${content.value}</p>
            </div>
        </div>
        `

        divToPrepend.prepend(newReview)

        content.value = '';

    });

    const deletes = document.getElementsByClassName('delete')
    
    console.log(deletes)
    for (let i = 0; i < deletes.length; i++) {
        deletes[i].addEventListener('click', async (event) => {
            const call = '/profile/delete/' + event.target.id;

            const array = event.target.id.split('/')
            const collectionId = array[0]
            const collectionName = array[1]

            await fetch(call, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('got there ')

            document.getElementById(`list-${collectionId}`).remove();

            const collectionSelect = document.getElementById('collectionSelect');
            const newDropDown = document.createElement('option')
            newDropDown.value = collectionId;
            newDropDown.innerText = collectionName;

            collectionSelect.prepend(newDropDown)

            const collectionListItems = document.getElementsByClassName('collectionListItems');
            console.log(collectionListItems)
            if (collectionListItems.length === 0) {
                document.getElementById('inCollectionsArea').classList.add('hidden')
            }


        })

        
    }





});

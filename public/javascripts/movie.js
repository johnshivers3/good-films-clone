document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('addToCollection').addEventListener('click', async (event) =>{
        event.preventDefault();

        const collectionId = document.getElementById('collectionSelect').value;
        const movieId = document.getElementById('movieId').value;

        const hello = await fetch(`/profile/${collectionId}/${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const div = document.getElementById('addToCollectionsDiv');
        div.innerHTML = '';
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
                <div> 
                    <label>Rating: </label>
                    <span>${rating.value}</span>
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



});
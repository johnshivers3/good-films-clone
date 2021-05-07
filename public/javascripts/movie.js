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
        const content = document.getElementById('content').value;
        const userId = document.getElementById('userId').value;
        const movieId = document.getElementById('movieId').value;

        const data = {
            rating,
            content,
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
        const divToPrepend = document.getElementsById("reviewBox");
        const newReview = document.createElement(div)
        const reviewList = document.getElementsByClassName(".reviewsList");

        divToPrepend.innerHTML = `
            <div class="movieInfo review-area">
                <div class="userAndDate">
                    <label>User: </label>
                    <span>${locals.user.firstName} ${locals.user.lastName}</span>
                    

                </div>


            </div> 
        `

        newReview.classList.add()

    });



});
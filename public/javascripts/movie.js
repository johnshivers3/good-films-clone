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




    document.getElementById('create-review').addEventListener('click', async (event) =>{
        event.preventDefault();

        const rating = document.getElementById('rating').value;
        const content = document.getElementById('content').value;
        const userId = document.getElementById('userId').value;
        const movieId = document.getElementById('movieId').value;

        const hello = await fetch(`/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                rating,
                content,
                userId,
                movieId
            }
        })

        console.log("hello")

    });



});

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('addToCollection').addEventListener('click', async (event) =>{
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

        const div = document.getElementById('addToCollectionsDiv');
        div.innerHTML = '';
    })





})

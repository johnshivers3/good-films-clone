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





})
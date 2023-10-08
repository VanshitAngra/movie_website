// http://www.omdbapi.com/?s=avengers&page=1&apikey=8652c1ca
// http://www.omdbapi.com/?i=tt3896198&apikey=8652c1ca
const movieSearchBox=document.getElementById('search-movie');
const searchList=document.getElementsByClassName('search-list')[0];
const resultGrid=document.getElementById('resultGrid');

async function loadMovies(searchTerm){
    const URL=`http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=8652c1ca`;
    const res=await fetch(`${URL}`);
    const data=await res.json();
    // console.log(data);
    if(data.Response == "True")
    displayMovieList(data.Search);
}
function findMovies(){
    let searchTerm=(movieSearchBox.value).trim();
    if(searchTerm.length > 0)
    {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    }
    else{
        searchList.classList.add('hide-search-list');
    }

}

function displayMovieList(movies){
    searchList.innerHTML="";
    for(let i=0;i<movies.length;i++){
        let movieListItem=document.createElement('div');
        movieListItem.dataset.id=movies[i].imdbID;
        movieListItem.classList.add('search-item');
        if(movies[i].Poster !="N/A")
            moviePoster=movies[i].Poster;
        else
        moviePoster="./imgs/image.png";

        movieListItem.innerHTML=`
        <div class="thumbnail">
        <img src="${moviePoster}" alt="">
    </div>
    <div class="search-info">
        <h3>${movies[i].Title}</h3>
        <p>${movies[i].Year}</p>
    </div>`;
    searchList.appendChild(movieListItem);

    }
}
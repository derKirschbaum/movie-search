import React, { SyntheticEvent } from 'react';

require("dotenv").config()

export function SearchBox(props : any){

    let endPoint : string = `http://www.omdbapi.com/?apikey=${process.env.apiKey}&`;

    const [movieName, setMovieName] = React.useState<string>("");
    const [movieYear, setMovieYear] = React.useState<string>("");
    const [movieType, setMovieType] = React.useState<string>("");
    const [advanceSearch, setAdvanceSearch] = React.useState<boolean>(false);
    const [emptyTitle, setEmptyTitle] = React.useState<boolean>(false);

    let showAdv: any = "";
    let showErr : any = "";//If props.page doesn't exist, default 1.

    let advanceSearchBox = (
        <div className="input-group mb-3 w-100">
        <span className="input-group-text" id="year">Year</span>
        <input type="text" className="form-control" placeholder="Release Year" aria-label="Release Year" aria-describedby="year" value={movieYear} onChange={e=>setMovieYear(e.target.value)}></input>
        <select className="form-select" aria-label="Search Type" value={movieType} onChange={e=> setMovieType(e.target.value)}>
            <option selected>Select Result Type</option>
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
            <option value="game">Game</option>
        </select>
    </div>
    );

    let emptyNameErr = (
        <div className="invalid-feedback" id="movie-search-feedback">
            Movie's name can't be empty.
        </div>
    );

    function submitSearch(e : SyntheticEvent){

        //If submit search, reset page.
        props.pageSetter(1);
        if(movieName === ""){
            setEmptyTitle(true);
            return;
        }else {
            setEmptyTitle(false);
        }

        // If no advSearch, do title search.
        if(!advanceSearch){
            fetch(endPoint + `s=${movieName}`).then(async (result)=>{
                props.toParent(await result.json())
            });

            props.setCurrentSearch(endPoint + `s=${movieName}`)
        }else {
            //If search all type, leave empty string.
            fetch(endPoint + `s=${movieName}&y=${movieYear}&type=${movieType === "all" ? "":movieType}`).then(async (result)=>{
                props.toParent(await result.json())
            });

            props.setCurrentSearch(endPoint + `s=${movieName}&y=${movieYear}&type=${movieType === "all" ? "":movieType}`)
        }
    }

    if(emptyTitle){
        showErr = emptyNameErr;
    }else {
        showErr = "";
    }

    if(advanceSearch){
        showAdv = advanceSearchBox;
    }else {
        showAdv = "";
    }


    return(
        <div className="SearchBox">
            <h1 style={{textAlign: "center"}}>Search for Movies</h1>
            <div className='d-flex flex-row justify-content-center'>
                <div className='d-flex flex-column w-50'>
                    <div className="input-group mb-3 w-100">
                        <span className="input-group-text" id="movie-search">Search</span>
                        <input type="text" className={"form-control ".concat(emptyTitle ? "is-invalid":"")} placeholder="Movie's Name" aria-label="Search Movie's Name" aria-describedby="movie-search-feedback" value={movieName} onChange={(e)=>setMovieName(e.target.value)}></input>
                        <button className='btn btn-primary' onClick={e=>submitSearch(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                        {showErr}
                    </div>
                    {showAdv}
                    <button className="btn btn-secondary" onClick={()=>{setAdvanceSearch(!advanceSearch)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sliders" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
                        </svg>
                        &nbsp;Advance Search
                    </button>
                </div>
            </div>
        </div>
    );
}
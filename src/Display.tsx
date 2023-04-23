import React from 'react';
import Modal from "react-bootstrap/Modal";
require("dotenv").config()

export function Display(props : any){

    const [movieData, setMovieData] = React.useState<any>({});
    const [showModal, setShowModal] = React.useState<boolean>(false);

    let movies = props.result?.Search?.map((movie : any)=>{
        return (
        <div className="card m-2" style={{width: "15vw"}} onClick={e=> handleCard(movie.imdbID)}>
            <img src={movie.Poster} className="card-img-top" alt={`Poster of ${movie.Title}`}></img>
            <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">
                    <span><strong>Year: </strong>{movie.Year}</span><br></br>
                    <span><strong>IMDB ID: </strong>{movie.imdbID}</span><br></br>
                    <span><strong>Type: </strong>{movie.Type}</span>
                </p>
            </div>
        </div>
        );
    });

    function handleCard(movID:string){
        fetch(`http://www.omdbapi.com/?apikey=${process.env.apiKey}&i=` + movID).then( async (movData : any)=>{
            let result = await movData.json();
            setMovieData(await result);
            setShowModal(true);
        });
    }

    function getNewPage(page : number){
        fetch(props.currentSearch + `&page=${page}`).then(async (m)=>{
            let result = await m.json();

            props.setResult(await result);

        });
    }

    return (
        <div className="display">
            {
                //Popup for modal
            }
            <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {movieData?.Title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className='d-flex justify-content-center'>
                    <img src={movieData?.Poster} alt={`Poster of ${movieData.Title}`}></img>
                </div>
                <div>
                    <span><strong>Released: </strong>{movieData?.Released}</span><br></br>
                    <span><strong>Rated: </strong>{movieData?.Rated}</span><br></br>
                    <span><strong>Runtime: </strong>{movieData?.Runtime}</span><br></br>
                    <span><strong>Genre: </strong>{movieData?.Genre}</span><br></br>
                    <span><strong>Director: </strong>{movieData?.Director}</span><br></br>
                    <span><strong>Writer: </strong>{movieData?.Writer}</span><br></br>
                    <span><strong>Actors: </strong>{movieData?.Actors}</span><br></br>
                    <span><strong>Plot: </strong>{movieData?.Plot}</span><br></br>
                    <span><strong>Awards: </strong>{movieData?.Awards}</span><br></br>
                    <span><strong>Box Office: </strong>{movieData?.BoxOffice}</span><br></br>
                    <span><strong>Metascore: </strong>{movieData?.Metascore}</span><br></br>
                    <span><strong>IMDB Rating: </strong>{movieData?.imdbRating} (total {movieData?.imdbVotes} votes)</span>
                </div>
                </Modal.Body>
            </Modal>
            <div className='text-center'>
                <h1>Results</h1>
                <h6>Total {props.result?.totalResults} results</h6>
                <button className="btn btn-primary" disabled={props.page === 1} onClick={(e)=>{props.pageSetter(props.page - 1); getNewPage(props.page - 1)}}>&lt;&lt;</button>&nbsp;
                <span>Page {props.page} of {Math.ceil(Number(props.result?.totalResults) / 10)}</span>&nbsp;
                <button className="btn btn-primary" disabled={props.page === Math.ceil(Number(props.result?.totalResults) / 10)} onClick={(e)=>{props.pageSetter(props.page + 1) ; getNewPage(props.page + 1)}}>&gt;&gt;</button>
            </div>
            <div className="d-flex flex-row flex-wrap">
                {movies}
            </div>
        </div>
    )
}

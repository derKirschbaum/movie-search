import React from 'react';
import { Display } from "./Display";
import { SearchBox } from './SearchBox';

function App() {

  // Allow passing data between sibling components
  const [result, setResult] = React.useState<Object>();
  const [page, setPage] = React.useState<number>(1);
  const [currentSearch, setCurrentSearch] = React.useState<string>("");

  //Passing setState function to components' props allow reverse data flow. Child -> Parent

  let display = <Display result={result} pageSetter={setPage} page={page} currentSearch={currentSearch} setResult={setResult}></Display>;

  let showDisplay : any =  "";

  if(result){
    showDisplay = display;
  }else {
    showDisplay = "";
  }

  return (
    <div className="App">
        <SearchBox setCurrentSearch={setCurrentSearch} toParent={setResult} page={page} pageSetter={setPage}></SearchBox>
        {showDisplay}
    </div>
  );
}

export default App;

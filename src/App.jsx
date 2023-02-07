import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Locations from "./components/Locations";
import ResidentInfo from "./components/ResidentInfo";
import getRandomLocation from "./utils/getRandomLocation";

function App() {
    const [location, setLocation] = useState();
	const [numberLocation, setNumberLocation] = useState(getRandomLocation())
	const [hasError, setHasError] = useState(false)
    const [listLocation, setListLocation] = useState()
    const [isShow, setIsShow] = useState(true)

    // console.log(listLocation);
    useEffect(() => {
        const url = `https://rickandmortyapi.com/api/location/${numberLocation}`;
        axios
            .get(url)
            .then((res) => {
			setLocation(res.data)
			setHasError(false)
			})
            .catch((err) => {
			console.log(err)
			setHasError(true)
			});
    }, [numberLocation]);

	const handleSubmit =e=>{
		e.preventDefault()
        if (e.target.inputLocation.value.trim().length===0){
            setNumberLocation(getRandomLocation())
        }
        else{
            setNumberLocation(e.target.inputLocation.value.trim());
        }
            
		e.target.inputLocation.value=e.target.inputLocation.value.trim();
	}
    const handleChange=e=>{
        
        const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`;
        axios.get(url)
        .then(res=>setListLocation(res.data.results))
        .catch(err=>console.log(err))
    }
    const handleFocus=()=>{
        setIsShow(true)
        console.log('focus');
    }
    const handleBlur=()=>{
        setIsShow(false)
        console.log('blur');
    }
    const handleClickList = (id) => setNumberLocation(id);
     

    //  console.log(inputValue);
    return (
        <div className="App">
            <div className="App__header">
                <h1 className="App__title">Rick and Morty</h1>

                <form className="form" onSubmit={handleSubmit}>
                    <input
                        className="form__input"
                        id="inputLocation"
                        type="text"
                        onChange={handleChange}
                        // onFocus={handleFocus}
                        // onBlur={handleBlur}
                    />
                    <button className="form__btn">Search</button>
                </form>
            </div>

            {isShow && (
                <ul className="form__ul">
                    {listLocation?.map((loc) => (
                        <li
                            className="form__list"
                            onClick={() => handleClickList(loc.id)}
                            key={loc.id}
                        >
                            {loc.name}
                        </li>
                    ))}
                </ul>
            )}

            {hasError ? (
                <h3 className="app__error">
                    Hey! You must provide an id from 1 to 126
                </h3>
            ) : (
                <>
                    <Locations location={location} />
                    <div className="container">
                        {location?.residents.map((url) => (
                            <ResidentInfo key={url} url={url} />
                        ))}
                    </div>
                </>
            )}
            
        </div>
    );
}

export default App;

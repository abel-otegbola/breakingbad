import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';



const Home = () => {
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(true);
    let [query, setQuery] = useState(0)
    const [search, setSearch] = useState("")

    //endpoint for the data when the page loads or when the user searches
    let ENDPOINT = ""
    if(search.length > 0) {
       ENDPOINT = `https://www.breakingbadapi.com/api/characters?name=${search}&limit=30&offset=${query}`
    }
    else {
       ENDPOINT = `https://www.breakingbadapi.com/api/characters?limit=10&offset=${query}`
    }

    //get the data from the endpoint
    useEffect(() => {
        setLoading(true)
        const fetchData = async() => {
            const result = await axios(ENDPOINT)
            //save the items into the item state
            setItem(result)

            //remove the loader once the items are saved
            setLoading(false)
        }
        fetchData()
    }, [ENDPOINT])


    //functions to handle the next and previous buttons
    const handleNext = () => {
        setLoading(true)
        setQuery(query > 70 ? 0 : query += 10)
    }
    const handlePrev = () => {
        setLoading(true)
        setQuery(query < 0 ? 70 : query -= 10)
    }

return (
    <div>
    <div className="search">
        <input type="text" placeholder="Search chrarcters..." onChange={(event) => setSearch(event.target.value)}/>
    </div>
    <div className="container">
        {loading === true ? 
            //show the loader first before the items load
            <div className="loader">
                <p className="double">            
                    <span className="ouro ouro3">
                    <span className="left"><span className="anim"></span></span>
                    <span className="right"><span className="anim"></span></span>
                    </span>
                </p>
            </div> : 
            //display the items on the page
            item.data.map(element => {
                return (
                    <Link to={`/char?id=${element.char_id}`} key={element.char_id} className="character">
                        <img src={element.img} alt={element.name} />
                        <div className="para">
                            <h3>{element.name}</h3>
                            <p><strong>OCCUPATION:</strong> {element.occupation}</p>
                            <p><strong>BIRTHDAY:</strong> {element.birthday}</p>
                            <p><strong>STATUS:</strong> {element.status}</p>
                        </div>
                    </Link>
                )
            })
        }
    </div>
    <div className="navigation">
        <button onClick={() => handlePrev()}>Prev</button>
        <button onClick={() => handleNext()}>Next</button>
    </div>

    </div>
    )
}

export default Home;
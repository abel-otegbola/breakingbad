import React, { useEffect, useState } from "react";
import axios from 'axios';
import queryStrings from 'query-string'

const Char = ({ location }) => {
    //get the id of the item
    let {id} = queryStrings.parse(location.search);
    
    const [character, setCharacter] = useState()
    const [loading, setLoading] = useState(true);
    let [index, setIndex] = useState(id);


    useEffect(() => {
        //get the item from the api
        const fetchData = async() => {
            const result = await axios(`https://www.breakingbadapi.com/api/characters/${index}`)
            setCharacter(result)
            setLoading(false)
        }
        fetchData()
    }, [index])


    //functions to handle the next and previous buttons
    const handleNext = () => {
        if(index > 70) {
            setIndex(1)        
            setLoading(true)    
        }
        else{  
            setLoading(true)  
            setIndex(index+1)
        }
        console.log(index)
    }

    const handlePrev = () => {
        if(index < 0) {
            setIndex(70)        
            setLoading(true)    
        }
        else{  
            setLoading(true)  
            setIndex(index-1)
        }
    }

    return (
        loading === true ? 
            //show the loader first before the items load
            <div className="loader">
                <p className="double">            
                    <span className="ouro ouro3">
                    <span className="left"><span className="anim"></span></span>
                    <span className="right"><span className="anim"></span></span>
                    </span>
                </p>
            </div> : 

            //display the item on the page
            <div className="single">
                <h3>{character.data[0].name.toUpperCase()}</h3>
                <img src={character.data[0].img} width="40%" height="100%" alt={character.data[0].name} />
                <div className="para">
                    <div className="occupation"><strong>OCCUPATION:</strong><ul> {character.data[0].occupation.map(list => <li key={character.data[0].char_id += 1}>{list}</li>)}</ul></div>
                    <p><strong>BIRTHDAY:</strong> {character.data[0].birthday}</p>
                    <p><strong>PORTRAYED:</strong> {character.data[0].portrayed}</p>
                    <p><strong>NICKNAME:</strong> {character.data[0].nickname}</p>
                    <p><strong>SEASONS:</strong> {character.data[0].appearance.length}</p>
                    <p><strong>STATUS:</strong> {character.data[0].status}</p>
                </div>
                <div className="navigation">
                    <button onClick={() => handlePrev()}>Prev</button>
                    <button onClick={() => handleNext()}>Next</button>
                </div>
            </div>
    )
}

export default Char;
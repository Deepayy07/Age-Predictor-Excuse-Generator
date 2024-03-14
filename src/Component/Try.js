import React, { useState } from "react";
import "./Test.css"
import axios from "axios";

export const Try = () => {
    const[name, setName] = useState("")
    const[details, setDetails] = useState({})
    const[predictOn, setPredictOn] = useState("")

    const predict = () => {
        if(name.trim() === ""){
            (setDetails({}))
            setPredictOn("noName")
            return    
        } else {
            axios.get(`https://api.agify.io/?name=${name}`)
            .then((response) => {setDetails(response.data)})
            setPredictOn("yesName")
        }
        }

        const [excusesList, setExcusesList] = useState(false)
        const [excuse, setExcuse] = useState("")
        
        const excusesOn =() => {
            setExcusesList(!excusesList)
        }

        const excuseFor = (domainField) => {
            axios.get(`https://excuser-three.vercel.app/v1/excuse/${domainField}`)
            .then((response) => setExcuse(response.data[0].excuse))
        }

    return(
        <div className="container">
                <div className="prediction">
                        <div className="predictor">
                            Enter your name here : 
                            <input placeholder="Eg:Deepayy" value={name} onChange={(event) => setName(event.target.value)}/>
                            <button onClick={predict}>  Predict </button>

                            {(predictOn === "noName") && <div> Please enter a name </div>}

                            {(predictOn === "yesName") && 
                                <div>
                                Name:{details.name}   <br/>
                                Age:{details.age}   <br/>
                                Population:{details.count}   <br/>
                                </div>}
                        </div>
                </div>

            <div className="excuseGenerator">
                    <div className="generator">
                        <button className = "buttons" onClick={excusesOn}>Generate excuses</button>         

                        {(excusesList) ? 
                            <div className = "collectionOfBottons"> 
                                <button className = "buttons" onClick={() => excuseFor("family")}> Family </button>
                                <button className = "buttons" onClick={() => excuseFor("office")}> Office </button>
                                <button className = "buttons" onClick={() => excuseFor("children")}> Children </button>
                                <button className = "buttons" onClick={() => excuseFor("college")}> College </button>

                            </div>     :       null}    
                    </div>

                        <br/>
                        <div className="excuses">{excuse}</div>
                            

            </div>
        </div>
    )
}

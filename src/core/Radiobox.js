import React, {useState,useEffect,Fragment} from 'react';


const RadioBox = ({prices, handleFilters})=>{
    const [value, setValue] = useState();

    const handleChange=(event)=>{
        handleFilters(event.target.value)
        setValue(event.target.value)
    }
    return prices.map((p, i)=>(

        <div key={i}>
            <input onChange={handleChange}
                   name={p}
                   type="radio"
                   value={`${p._id}`}
                   className="mr-2 ml-4"
                   />
            <label className="form-check-label">{p.name}</label>
        </div>
    )
    )
}

export default RadioBox;
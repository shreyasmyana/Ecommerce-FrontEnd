import React, {useState,useEffect} from 'react'


const Checkbox = ({categories, filters})=>{

    const [checked, setChecked] = useState([]);

    const handleToggle = c=>()=>{
        
        const currentCategoryId = checked.indexOf(c);
        const newCheckCategoryId = [...checked];

        if(currentCategoryId === -1){
            newCheckCategoryId.push(c)
        }
        else{
            newCheckCategoryId.splice(currentCategoryId,1)
        }
        console.log("New Check category ID",newCheckCategoryId)
        setChecked(newCheckCategoryId)
        filters(newCheckCategoryId);
    }

    
    return categories.map((c,i)=>{
        return (
                <li key={i} className="list-unstyled">
                    <input type="checkbox" onChange={handleToggle(c._id)} 
                            className="form-check-input" value={checked.indexOf(c._id === -1)}/>
                    <label className="form-check-label" >{c.name}</label>
                </li>
       )
    })
    }
       
    


export default Checkbox
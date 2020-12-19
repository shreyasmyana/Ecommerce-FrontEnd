import React from 'react'
import {API} from '../config';


export const ShowImage = ({item, url})=>{

    return(
        <div>
            <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} style={{maxHeight:"100%", maxWidth:"100%"}}/>
        </div>
    )
}
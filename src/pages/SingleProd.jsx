import React from 'react'
import { useState } from 'react'
import { getApiData } from '../Api/Api';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';

const SingleProd = () => {
    const [data,setData]=useState([]);

    const params = useParams();


    const getData=({id})=>{
        getApiData({id}).then((res)=>{
            setData(res)
            // console.log(res)
        })
    }

    useEffect(()=>{
        getData({id:params.id})
    },[params.id])
  return (
    <div>
        <ul>
            <li>{data.id}</li>
            <li>{data.name}</li>
            <li>{data.price}</li>
        </ul>
    </div>
  )
}

export default SingleProd
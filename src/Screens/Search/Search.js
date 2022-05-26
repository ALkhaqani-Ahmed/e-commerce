import React,{useEffect,useState} from 'react';
import {useSelector , useDispatch} from 'react-redux';
import {SearchResult , ProductsSearch,getAllProudtsFromServer,PData} from '../../Features/ProductsReducer';
import ProductCard from '../../Components/ProductCard/ProductCard';
import fuzzysort  from 'fuzzysort';
import{athintication} from '../../Features/UserReducer';

const Search = props =>{

const dispatch = useDispatch();
const productsData = useSelector(PData);
const [WordsSear , SetWordsSear] = useState();
const [reslut , Setresult] = useState([]); 
const areYouAdmin =useSelector(athintication);

useEffect(()=>{

        dispatch(getAllProudtsFromServer());
    
},[]);

useEffect(()=>{
    let result = fuzzysort.go(WordsSear,productsData,{
        threshold: -Infinity, // Don't return matches worse than this (higher is faster)
        limit: Infinity, // Don't return more results than this (lower is faster)
        all: false,
        
      key: null, // For when targets are objects (see its example usage)
      keys:['title'], // For when targets are objects (see its example usage)
      scoreFn: null,
    });
    Setresult(result.map(e => e.obj))
},[WordsSear])




return(
        <div style={{width:'100%',height:'100vh'}}>
            <div>
            <span className="material-symbols-outlined">search</span>
            <input onChange={event=>SetWordsSear(event.target.value)}  placeholder="Type product name"/>    
            </div>


            {reslut.map(elemnt => {
                return(
                    <ProductCard Admin={areYouAdmin} id={elemnt.id} key={elemnt.id} imgeurl={elemnt.image} name={elemnt.title}
                    model={elemnt.category}  price={elemnt.price} elemnt={elemnt} ClickOnMe={()=> console.log('buy me ')} />
                )
            })}
        </div>
    )
}


export default Search ;
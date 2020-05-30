import React,{useState,useEffect} from "react";
/*
      var a='' => 문자열
      var a=1 => 정수
      var a=[] => Array  ==> map
      var a={} => Object
 */
import axios from 'axios'
export default function RecipeDetail(props) {
    const {match}=props;
    const [detail,setDetail]=useState({});
    useEffect(()=>{
        axios.get('http://localhost:3355/recipe_detail',{
            params:{
                no:match.params.no
            }
        }).then((result)=>{
            setDetail(result.data)
        })
    },[])
    return (
        <div className={"row"} style={{"margin":"0px auto","width":"900px"}}>
            <table className={"table"}>
                <tr>
                    <td colSpan={"3"}>
                        <img src={detail.poster} width={"700"} height={"350"}/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={"3"}>
                        <h3>{detail.title}</h3>
                    </td>
                </tr>
                <tr>
                    <td colSpan={"3"}>
                        {detail.content}
                    </td>
                </tr>
            </table>
        </div>
    )
}
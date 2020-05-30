import React,{useEffect,useState} from "react";
import axios from 'axios'
export default function Chef() {
    const [chef,setChef]=useState([]);
    const [page,setPage]=useState(1);
    const [total,setTotal]=useState(0)
    useEffect(()=>{
        axios.get('http://localhost:3355/chef',{
            params:{
                page:page
            }
        }).then((result)=>{
           setChef(result.data);
        })
    },[])
    useEffect(()=>{
        axios.get('http://localhost:3355/chef_total')
            .then((result)=>{
            setTotal(result.data.total);
        })
    },[])
    const html=chef.map((m)=>
       <table className={"table"}>
           <tr>
               <td className={"text-center"} width={"30%"}
                   rowSpan={"3"}>
                   <img src={m.poster} width={"100"}
                        height={"100"} className={"img-circle"}/>
               </td>
               <td width={"70%"} colSpan={"4"}>{m.chef}</td>
           </tr>
           <tr>
               <td className={"text-center"}><img src={"/1.png"}/></td>
               <td className={"text-center"}><img src={"/3.png"}/></td>
               <td className={"text-center"}><img src={"/7.png"}/></td>
               <td className={"text-center"}><img src={"/2.png"}/></td>
           </tr>
           <tr>
              <td className={"text-center"}>{m.mem_cont1}</td>
              <td className={"text-center"}>{m.mem_cont3}</td>
              <td className={"text-center"}>{m.mem_cont7}</td>
               <td className={"text-center"}>{m.mem_cont2}</td>
           </tr>

       </table>
    )
    return (
        <div className={"row"} style={{"margin":"0px auto","width":"700px"}}>
          <table className={"table"}>
              <tbody>
                <tr>
                    <td>
                        {html}
                    </td>
                </tr>
              </tbody>
          </table>
        </div>
    )
}
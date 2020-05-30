import React,{useState,useEffect} from "react";
import axios from 'axios'
/*
     class Recipe
     {
        private String[] repice;
        public void setRecipe(String[] repice)
        {
           this.repice=repice
        }
     }
 */
export default function Recipe() {
  const [recipe,setRecipe]=useState([]);
  const [page,setPage]=useState(1);
  const [total,setTotal]=useState(0)
  // http://localhost:3355/recipe?page=1
  useEffect(async ()=>{
    // 서버를 연결해서 데이터를 읽어온 후 => setRecipe에 저장
    await axios.get('http://localhost:3355/recipe',{
       params:{
         page:page
       }
    }).then((result)=>{
       setRecipe(result.data);
    })
  },[])

    useEffect(async ()=>{
        await axios.get('http://localhost:3355/recipe_total').then((result)=>{
            setTotal(result.data.total)
        })
    },[])
  // 출력할 데이터를 모아서 => return에 전송
    const onPrev=()=>{
        setPage(page>1?page-1:page)
        axios.get('http://localhost:3355/recipe',{
            params:{
                page:page
            }
        }).then((result)=>{
            setRecipe(result.data);
        })
    }
    const onNext=()=>{
      setPage(page<total?page+1:page)
        axios.get('http://localhost:3355/recipe',{
            params:{
                page:page
            }
        }).then((result)=>{
            setRecipe(result.data);
        })
    }
    // render()
  const html=recipe.map((m)=>
      <div className="col-md-4">
          <div className="thumbnail">

                  <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                      <div className="caption">
                          <p style={{"fontSize":"9pt"}}>{m.title}</p>
                          <sub style={{"color":"gray"}}>{m.chef}</sub>
                      </div>

          </div>
      </div>
  )
  return (
      <React.Fragment>
          <div className={"row"}>
              {html}
          </div>
          <div className={"row"}>
              <button className={"btn btn-lg btn-primary"} onClick={onPrev}>이전</button>
              {page} page / {total} pages
              <button className={"btn btn-lg btn-danger"} onClick={onNext}>다음</button>
          </div>
      </React.Fragment>
  )
}
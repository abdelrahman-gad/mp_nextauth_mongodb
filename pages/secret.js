import {useEffect , useState} from 'react';
import {getSession, session, useSession} from 'next-auth/client';

export default function Secret(){

    const [session, loading]  = useSession();
    const [content, setContent] = useState();
    useEffect(() => {
        const fetchData = async ()=>{
         const res = await fetch('/api/secret');
         const json = await res.json();
         if(json.content){
           setContent(json.content);
         }
        }
        fetchData();
    }, [session])

    // if window or sessin didn't load return null
     if(typeof window !=='undefined' &&  loading ) return null;
     //    return jsx based on the return
     if(!session){
      return (
          <>
               <p> You are not authorized to access those pages, please sign in first </p>
          </>
      );
     }
     if(session){
         console.log(session);
       return (
           <>
               <p> Welcome to our secret pages     { session.user.email } </p>
               <p> {content} </p>
           </>
       );
     }

}
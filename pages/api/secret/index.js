import {getSession} from 'next-auth/client';
import dbConnect from './../../../utils/dbConnect';
export default async (req, res)=>{
    dbConnect();
    const session = getSession({req});
    if(session){
        
        res.send({
            content:"Welcome to secret page"
        })
    }else{
        res.send({error:"You can not access the secret pages,please sign in first"})
    }

}
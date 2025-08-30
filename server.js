const express=require('express');
const axios=require('axios').default;
const app=express();
const client=require('./client');
const port=9000;

app.get('/',async(req,res)=>{
    const cachevalue=await client.get('todos');
    if(cachevalue){
        console.log('Cache Hit');
        return res.json(JSON.parse(cachevalue));
    }
    const {data}=await axios.get('https://jsonplaceholder.typicode.com/todos');
    await client.set('todos',JSON.stringify(data));
    await client.expire('todos',20);
    console.log('Cache Miss');
    return res.json(data)
})

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})
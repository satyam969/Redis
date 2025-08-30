const client=require('./client');
async function init(){
    await client.lpush('messages',1);
    await client.lpush('messages',2);
    await client.lpush('messages',3);
    const result=await client.lrange('messages',0,-1);
    console.log(result);
    const result2=await client.llen('messages');
    console.log(result2);
    const result3=await client.rpop('messages');
    console.log(result3);
    const result4=await client.llen('messages');
    console.log(result4);
}
init();
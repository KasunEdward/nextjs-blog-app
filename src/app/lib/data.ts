import {createClient, sql} from '@vercel/postgres';
 export async function connectToDB(){
    const client = createClient()
    await client.connect();
    try{
        if(client){
            console.log('Connected to the database');
            return client;
        }
    }catch(error){
        console.error('Error connecting to the database', error)

    }
 }
 export async function getPosts() {
    try {
      const data = await sql`SELECT * FROM posts`
      return data.rows;
    } catch (error) {
      console.error('Error getting posts', error);
    }
  }
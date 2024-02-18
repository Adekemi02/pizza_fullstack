import Head from 'next/head';
import { Inter } from 'next/font/google';
import Intro from '@/components/Intro';
import Offers from '@/components/Offer';
import Strength from '@/components/Strength';
import Feedback from '@/components/Feedback';
import axios from 'axios';
import { BASE_API_URL } from '@/utils/connectUrl';


const inter = Inter({ subsets: ['latin'] })

export default function Home({product}) {
  // if(!BASE_API_URL) {
  //   return null
  // }

  return (
    <>
      <Head>

        <title>Pizzon</title>
        <meta name="description" content="Best Pizza in Town" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <Intro />
      <Offers product={product || []}/>
      <Strength />
      <Feedback />
    </>
  )
}


export const getServerSideProps = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/products`);

    if (res.status !== 200) {
      console.error(`Failed to fetch data. Status code: ${res.status}`);

      return {
        notFound: true, 
      };
    }
    // const res = await fetch(`${BASE_API_URL}/api/products`);
    // const result = await resData.json()
    const  result1 = res.data.data;

    // console.log("API Response:", res);
    // console.log("Extracted Data:", result1);

    return {
        props: {
          product: Array.isArray(result1) ? result1 : [],
        
        },
      };
  } catch (err) {
      console.error(err.message);
      const errorMessage = err.message || "An error occurred";
      return  {
        props: {
          message: "Error from server side.",
          err: errorMessage
        }
        
      }
  }
  // const myCookie = ctx.req?.cookies || "";
  // let admin = false;

  // if (myCookie.token === process.env.TOKEN) {
  //   admin = true;
  // }

  

  
};
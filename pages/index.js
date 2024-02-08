import { Inter } from 'next/font/google';
import Intro from '@/components/Intro';
import Offers from '@/components/Offer';
import Strength from '@/components/Strength';
import Feedback from '@/components/Feedback';
import axios from 'axios';
import { BASE_URL } from './api/utils/connectUrl';


const inter = Inter({ subsets: ['latin'] })

export default function Home({pizzaList}) {
  if(!BASE_URL) {
    return null
  }

  return (
    <main>
      <Intro />
      <Offers pizzaList={pizzaList} />
      <Strength />
      <Feedback />
    </main>
  )
}


export const getServerSideProps = async () => {
  // const myCookie = ctx.req?.cookies || "";
  // let admin = false;

  // if (myCookie.token === process.env.TOKEN) {
  //   admin = true;
  // }

  // const res = await axios.get("http://localhost:3000/api/products");
  const res = await axios.get(`${BASE_URL}/api/products`);
  // const result = await res.json()
  const  pizzaList = res.data;

  return {
    props: {
      pizzaList: pizzaList,
    
    },
  };
};
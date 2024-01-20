import { Inter } from 'next/font/google'
import Intro from '@/components/Intro'
import Offers from '@/components/Offer'
import Strength from '@/components/Strength'
import Feedback from '@/components/Feedback'
import axios from 'axios';


const inter = Inter({ subsets: ['latin'] })

export default function Home({pizzaList}) {
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

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
    
    },
  };
};
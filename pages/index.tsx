import Head from 'next/head'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Query from '../components/Query';
import Quiz from '../components/Quiz';

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizData, setQuizData] = useState({});
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const query = e.target.query.value;

    const result = await axios.post('/api/openai', {
      query: query
    })
      .then(res => {
        return res;
      });
      
    if (result.status == 200 && result.data.status == 'success') {
      setQuizStarted(true);
      setLoading(false);

      const data = JSON.parse(result.data.data);
      console.log(data);

      if (data.status == "success") {
        setQuizData(data);
      } else {
        toast.error('Der skete en fejl. Prøv igen.');
      }
    } else {
      toast.error('Der skete en fejl. Prøv igen.');
    }
  }

  return (
    <>
      <Head>
        <title>TestGPT</title>
        <meta name="description" content="Test dine færdigheder ved hjælp af OpenAI's teknologi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-10 md:p-4 h-screen relative bg-gradient-to-t from-white to-sky-200">
        <Header />

        <div className='flex justify-center w-full'>
          <QuizWrapper quizStarted={quizStarted} loading={loading} quizData={quizData} handleSubmit={handleSubmit} />
        </div>

        <Footer />
      </div>
    </>
  )
}

function QuizWrapper(props: any) {
  if (props.quizStarted) {
    return (
      <div className='flex justify-center w-full'>
        <Quiz quizData={props.quizData} />
      </div>
    )
  } else if (props.loading) {
    return (
      <div className='flex flex-wrap justify-center w-full'>
        <RotatingLines
          strokeColor="#000"
          strokeWidth="2"
          width="60"
        />
        <p className='w-full text-center text-xs mt-4'>Loader spørgsmål...</p>
      </div>
    )
  } else {
    return (
      <div className='flex justify-center w-full'>
        <Query handleSubmit={props.handleSubmit} />
      </div>
    )
  }
}
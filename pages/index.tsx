import Head from 'next/head'
import axios from 'axios';

export default function Home() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const query = document.getElementById('query').value;

    const result = await axios.post('/api/openai', {
      query: query
    })
      .then(res => {
        return res;
      });

    if (result.status === 200) {
      console.log(result.data);
    } else {
      console.log('Error');
    }
  }

  return (
    <>
      <Head>
        <title>TestGPT</title>
        <meta name="description" content="Test dine færdigheder i uddannelsen, HA(it.)'s vigtigste fag ved hjælp af OpenAI's teknologi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-10 h-screen min-w-[600px] relative bg-gradient-to-t from-white to-sky-200">
        <div className='flex justify-between mb-40'>
          <p className='mr-2'>
            Upload et tekststykke og test din viden
          </p>
          <div>
            <p className='font-bold text-xl'>TestGPT</p>
          </div>
        </div>

        <div className='flex justify-center w-full'>
          <form onSubmit={handleSubmit} className='flex justify-center w-full'>
            <textarea id='query' className='w-6/12 border-2 border-dotted border-sky-400 p-2 rounded-xl h-[200px]' />
          </form>
        </div>

        <div className="flex justify-center absolute bottom-4 w-full text-sm -ml-10">
          <p>Lavet af en studerende på CBS, 2023</p>
        </div>
      </div>
    </>
  )
}

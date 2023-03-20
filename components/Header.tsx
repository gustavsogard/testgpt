import Router from 'next/router';

export default function Header() {
    return (
        <div className='flex justify-center md:mb-40 md:mt-0 mb-20 mt-8'>
          <div>
            <button onClick={() => Router.reload()} className='font-bold text-xl'>
              <img src="/testgpt-logo.png" width="150" />
            </button>
          </div>
        </div>
    )
}
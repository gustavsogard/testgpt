import Link from 'next/link'

export default function Header() {
    return (
        <div className='flex justify-between mb-40'>
          <div>
            <Link href="/" className='font-bold text-xl'>TestGPT</Link>
          </div>
          <p className='ml-2'>
            Upload et tekststykke og test din viden
          </p>
        </div>
    )
}
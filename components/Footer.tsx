import Link from 'next/link';

export default function Footer() {
    return (
        <div className="flex justify-center w-full text-sm mt-10 pb-8">
          <p className='text-center'>Lavet af en <Link href="https://www.linkedin.com/in/gustav-christian-s%C3%B8g%C3%A5rd/" target='_blank' className="underline">studerende</Link> på CBS, 2023</p>
        </div>
    )
}
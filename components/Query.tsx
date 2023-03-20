export default function Query(props: any) {
    return (
        <form onSubmit={props.handleSubmit} className='flex flex-wrap justify-center w-8/12'>
            <textarea name='query' className='w-full border-2 border-dotted border-sky-400 p-2 rounded-xl h-[200px] mb-4' />
            <button type="submit" className='px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all'>Start test</button>
          </form>
    )
}
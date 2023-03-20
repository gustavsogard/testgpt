import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Query(props: any) {
    return (
        <div className="flex flex-wrap justify-center w-full">
            <p className='w-full font-semibold text-center mb-4'>
                Indtast et tekststykke og test din viden
            </p>
            <div className='flex justify-center w-full mb-20'>
                <form onSubmit={props.handleSubmit} className='flex flex-wrap justify-center w-11/12 max-w-[800px]'>
                    <textarea name='query' className='w-full border-2 border-dotted border-sky-400 p-4 rounded-xl h-[200px] mb-4 focus:outline-0' />
                    <button type="submit" className='px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all'>Start test</button>
                </form>
            </div>
            <div className='w-11/12 max-w-[600px]'>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Hvad er TestGPT?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        TestGPT er en nem måde for dig at øve dig på et selvvalgt stof. Du kan indtaste et tekststykke i feltet ovenfor, der omhandler noget du gerne vil blive bedre til, og blive testet gennem nogle spørgsmål, som automatisk bliver genereret. Alt sammen ved hjælp af OpenAI's teknologi.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography>Hvordan fungerer teknologien?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        Teknologien er baseret på OpenAI's GPT-3 model. Denne model er trænet på en masse forskellige tekster og kan derfor generere . Teknologien er dog ikke perfekt, så forvent ikke at få 100% relevante spørgsmål. Læs mere <a href="https://openai.com/product/" target="_blank" className='text-sky-500'>her</a>.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography>Kan jeg uploade dokumenter?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        I øjeblikket er TestGPT i et tidligt stadie og kan derfor ikke håndtere dokumenter. Hvis efterspørgslen er stor nok, vil yderligere funktioner herunder også muligheden for at gemme testsvar blive tilføjet.
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}
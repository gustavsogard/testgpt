import { useState, useEffect } from "react";
import Router from 'next/router';

export default function Quiz(props: any) {
    const [answer, setAnswer] = useState("");
    const [answered, setAnswered] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [button, setButton] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState(props.quizData.questions[0].answers[0]);
    const [finished, setFinished] = useState(false);
    const [correct, setCorrect] = useState(0);

    async function shuffle(array: []) {
        array.sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        if (currentQuestion === 0 && answered === false) {
            shuffle(props.quizData.questions[0].answers);
            setAnswers(props.quizData.questions[0].answers);
        }
    }, []);

    function buttonClick(e: any, answer: any) {
        setButton(e.target.id);
        setAnswer(answer);
        setAnswered(true);
    }

    function nextQuestion() {
        setAnswer("");
        setAnswered(false);
        setButton("");
        setCurrentCorrectAnswer(props.quizData.questions[currentQuestion + 1].answers[0]);
        shuffle(props.quizData.questions[currentQuestion + 1].answers);
        setAnswers(props.quizData.questions[currentQuestion + 1].answers);
        setCurrentQuestion(currentQuestion + 1);
    }

    function resultsPage() {
        setAnswer("");
        setAnswered(false);
        setButton("");
        setFinished(true);
    }

    function increaseScore() {
        setCorrect(correct + 1);
    }

    return (
        <div className="flex flex-wrap justify-center">
            {finished ? (
                <div className="w-full flex flex-wrap justify-center">
                    <h1 className="w-full text-center mb-8">
                        Resultat:
                    </h1>
                    <p className="w-full text-center font-bold text-2xl mb-8">
                        Du fik {correct} ud af {props.quizData.questions.length} rigtige.
                    </p>
                    <button onClick={() => Router.reload()} className="px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all">Start ny test</button>
                </div>
            ) : (
                <>
                    <h1 className="w-full text-center mb-8">
                        Spørgsmål {currentQuestion + 1}:
                    </h1>
                    <p className="w-full text-center font-bold text-2xl mb-4">
                        {props.quizData.questions[currentQuestion].question}
                    </p>
                    <div id="quiz">
                        <div className="w-full flex justify-center">
                            <button id="0" onClick={(e) => {buttonClick(e, answers[0])}} className="mx-2 px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 disabled:bg-gray-400 rounded-xl transition-all">{answers[0]}</button>
                            <button id="1" onClick={(e) => {buttonClick(e, answers[1])}} className="mx-2 px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 disabled:bg-gray-400 rounded-xl transition-all">{answers[1]}</button>
                        </div>
                        <div className="w-full flex justify-center mt-4">
                            <button id="2" onClick={(e) => {buttonClick(e, answers[2])}} className="mx-2 px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 disabled:bg-gray-400 rounded-xl transition-all">{answers[2]}</button>
                            <button id="3" onClick={(e) => {buttonClick(e, answers[3])}} className="mx-2 px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 disabled:bg-gray-400 rounded-xl transition-all">{answers[3]}</button>
                        </div>
                    </div>
                    <Answered quizData={props.quizData} currentQuestion={currentQuestion} answered={answered} button={button} answer={answer} currentCorrectAnswer={currentCorrectAnswer} increaseScore={increaseScore} nextQuestion={nextQuestion} resultsPage={resultsPage} />
                </>
            )}
        </div>
    )
}

function Answered(props: any) {
    useEffect(() => {
        if (props.answer == props.currentCorrectAnswer) {
            props.increaseScore();
        }
    }, [props.answered]);

    if (props.answered) {
        let buttons = document.getElementById("quiz")!.querySelectorAll("button");
        buttons.forEach((button) => {
            button.setAttribute("disabled", "");
        });

        let check = false;

        if (props.answer == props.currentCorrectAnswer) {
            buttons[props.button].classList.add("disabled:bg-green-500");
            check = true;
        } else {
            buttons[props.button].classList.add("disabled:bg-red-500");
            buttons.forEach((button) => {
                if (button.innerText == props.currentCorrectAnswer) {
                    button.classList.add("disabled:bg-green-200", "disabled:text-black");
                }
            });
        }

        return (
            <>
            <div className="w-full flex flex-wrap justify-center mt-12">
                {check ? (
                    <p>Det er rigtigt!</p>
                    ) : (
                    <p>Det er forkert!</p>
                    )
                }
            </div>
                {props.currentQuestion !== props.quizData.questions.length - 1 ? (
                        <div className="w-full flex justify-center mt-2">
                            <button onClick={props.nextQuestion} className="px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all">Næste spørgsmål</button>
                        </div>
                    ) : (
                        <div className="w-full flex justify-center mt-4">
                            <button onClick={props.resultsPage} className="px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all">Afslut test</button>
                        </div>
                    )
                }
            </>
        )
    } else if (props.currentQuestion !== 0) {
        let buttons = document.getElementById("quiz")!.querySelectorAll("button");
        buttons.forEach((button) => {
            button.disabled = false;
            button.classList.remove("disabled:bg-green-500", "disabled:bg-red-500", "disabled:bg-green-200", "disabled:text-black");
        });

        return null;
    } else {
        return null;
    }
}
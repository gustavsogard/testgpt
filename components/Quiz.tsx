import { useState } from "react";

export default function Quiz(props: any) {
    const [answered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState("");
    const [button, setButton] = useState(0);

    return (
        <div id="quiz" className="flex flex-wrap justify-center">
            <h1 className="w-full text-center mb-8">
                Spørgsmål:
            </h1>
            <p className="w-full text-center font-bold text-2xl mb-4">
                {props.quizData.question}
            </p>
            <div className="w-full flex justify-center">
                <button onClick={() => {setAnswered(true); setAnswer(props.quizData.answers[0]); setButton(1)}} className="mx-2 px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 disabled:bg-gray-400 rounded-xl transition-all">{props.quizData.answers[0]}</button>
                <button onClick={() => {setAnswered(true); setAnswer(props.quizData.answers[1]); setButton(2)}} className="mx-2 px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 disabled:bg-gray-400 rounded-xl transition-all">{props.quizData.answers[1]}</button>
            </div>
            <div className="w-full flex justify-center mt-4">
                <button onClick={() => {setAnswered(true); setAnswer(props.quizData.answers[2]); setButton(3)}} className="mx-2 px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 disabled:bg-gray-400 rounded-xl transition-all">{props.quizData.answers[2]}</button>
                <button onClick={() => {setAnswered(true); setAnswer(props.quizData.answers[3]); setButton(4)}} className="mx-2 px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 disabled:bg-gray-400 rounded-xl transition-all">{props.quizData.answers[3]}</button>
            </div>
            <Answered quizData={props.quizData} answered={answered} button={button} answer={answer} />
        </div>
    )
}

function Answered(props: any) {
    if (props.answered) {
        let buttons = document.getElementById("quiz")!.querySelectorAll("button");
        buttons.forEach((button) => {
            button.setAttribute("disabled", "");
        });

        if (props.answer == props.quizData.answers[0]) {
            buttons[props.button - 1].classList.add("disabled:bg-green-500");
        } else {
            buttons[props.button - 1].classList.add("disabled:bg-red-500");
        }

        return (
            <div className="w-full flex justify-center mt-8">
                {props.answer == props.quizData.answers[0] ? (
                    <p>Det er rigtigt!</p>
                    ) : (
                    <p>Det er forkert!</p>
                    )
                }
            </div>
        )
    } else {
        return null;
    }
}
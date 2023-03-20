import { useState } from "react";

export default function Quiz(props: any) {
    const [answered, setAnswered] = useState(false);
    const [answer, setAnswer] = useState("");

    return (
        <div className="flex flex-wrap justify-center">
            <h1 className="w-full text-center mb-8">
                Spørgsmål:
            </h1>
            <p className="w-full text-center font-bold text-2xl mb-4">
                {props.quizData.question}
            </p>
            <div className="w-full flex justify-center">
                <button onClick={() => {setAnswered(true); setAnswer(props.quizData.answers[0])}} className="mx-2 px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 disabled:bg-gray-400 rounded-xl transition-all">{props.quizData.answers[0]}</button>
                <button onClick={() => {setAnswered(true); setAnswer(props.quizData.answers[1])}} className="mx-2 px-8 py-2 border-2 border-sky-600 text-white bg-sky-500 hover:bg-sky-700 active:bg-sky-800 disabled:bg-gray-400 rounded-xl transition-all">{props.quizData.answers[1]}</button>
            </div>
            <Answered quizData={props.quizData} answered={answered} answer={answer} />
        </div>
    )
}

function Answered(props: any) {
    if (props.answered) {
        document.querySelectorAll("button").forEach((button) => {
            button.setAttribute("disabled", "true");
        });
        return (
            <div className="w-full flex justify-center mt-8">
                {props.answer == props.quizData.answers[0] ? (
                    <p>That's correct!</p>
                    ) : (
                    <p>That's incorrect!</p>
                    )
                }
            </div>
        )
    } else {
        return null;
    }
}
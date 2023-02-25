'use strict';

const e = React.createElement;
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
let result = [];





const questionList = [
    new Question("Сколько вам лет?", "11-12", "13-15", "16-17"),
    new Question("Для чего вы читаете?", "Для развлечения/ради интереса", "Для вдохновения", "Чтобы узнать что-то новое"),
    new Question("Что вас больше привлекает?", "Современная литература", "Классическая литература", "Доисторическая литература"),
    new Question("Насколько объемные книги вы любите?", "Люблю длинные истории", "Люблю краткие и небольшие истории", "Люблю средние истории"),
    new Question("Какое настроение должна создавать идеальная книга?", "Погружать в мрачный мир", "Дарить веру в хорошее", "Дарить атмосферу загадочности и тайны"),
    new Question("Каким должен быть главный герой идеальной книги?", "Сложный герой, со странностями", "Оптимистичный и позитивный герой", "Сильный герой, преодолевающий трудности"),
    new Question("Кем вы хотели стать в детстве?", "Известным человеком", "Путешественником", "Гениальным сыщиком"),
    new Question("Свои выходные вы скорее всего проведете:", "За учебой", "С друзьями", "В одиночестве"),
    new Question("Сколько страниц вы можете прочитать за раз?", "После 1-2 главы я засыпаю", "Стабильно 5-8 глав", "Могу прочитать половину книги"),
    new Question("Какое кино вы любите смотреть?", "Приключенческое кино и фантастику", "Мелодрамы", "Мистика"),
] // Список вопросов



function Question(question, a, b, c) {
    this.question = question;
    this.a = a;
    this.b = b;
    this.c = c;
} // Конструктор вопроса




class QuestionView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { questionNumber: 0 }
    }

    render() {
        return e(
            'div',
            { className: "question" },
            e(
                'h2',
                { className: "question__title" },
                'Вопрос ',
                this.state.questionNumber + 1
            ),
            e(
                'p',
                { className: "question__text" },
                questionList[this.state.questionNumber].question
            ),
            e(
                'button',
                {
                    className: "answer_button", onClick: () => {
                        result.push("a");
                        if (this.state.questionNumber + 1 < 10) this.setState({ questionNumber: this.state.questionNumber + 1 });
                        else root.render(seeResult());
                    }
                },
                questionList[this.state.questionNumber]["a"]
            ),

            e(
                'button',
                {
                    className: "answer_button", onClick: () => {
                        result.push("b");
                        if (this.state.questionNumber + 1 < 10) this.setState({ questionNumber: this.state.questionNumber + 1 });
                        else root.render(seeResult());
                    }
                },
                questionList[this.state.questionNumber]["b"]
            ),

            e(
                'button',
                {
                    className: "answer_button", onClick: () => {
                        result.push("c");
                        if (this.state.questionNumber + 1 < 10) this.setState({ questionNumber: this.state.questionNumber + 1 });
                        else root.render(seeResult());
                    }
                },
                questionList[this.state.questionNumber]["c"]
            ),

        );
    }
}







root.render(e(QuestionView));




function seeResult() {
    return (
        e(
            'div',
            { className: "question" },
            e(
                'h2',
                { className: "question__title" },
                'Рекомендуем вам книгу:'
            ),
            e(
                'div',
                { className: "result" },
                e(
                    'img',
                    { className: "result__image", src: "test_page/images/Lovecraft.png" }   // Фото книги
                )
            ),
            e(
                'p',
                { className: "question__text" },
                'Говард Лавкрафт "Хз че это"'   // Книга
            ),
            e(
                'button',
                {
                    className: "answer_button", onClick: () => {
                        result = [];
                        root.render(e(QuestionView));
                    }
                },
                'Пройти заново',
            )
        )
    )
}


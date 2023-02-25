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


const answerList = [
    new Answer('Беляев А. Р. – «Человек-амфибия»', 'test_page/images/book_1.webp', 'baaa'),
    new Answer('Брунштейн А. Я. – «Дорога уходит вдаль»', 'test_page/images/book_2.jpg', 'baac'),
    new Answer('Лесков Н. С. – «Неразменный рубль»', 'test_page/images/book_3.jpg', 'bbbb'),
    new Answer('Лермонтов М. Ю. – «Ашик-кериб»', 'test_page/images/book_4.jpg', 'abcb'),
    new Answer('Грин А. С. – «Алые паруса»', 'test_page/images/book_5.jpg', 'abbc'),
    new Answer('Полевой Б. Н. – «Повесть о настоящем человеке»', 'test_page/images/book_6.jpg', 'aaac'),
    new Answer('Пушкин А. С. – «Капитанская дочка»', 'test_page/images/book_7.jpg', 'cbcc'),
    new Answer('Чехов А.П. – «Тоска»', 'test_page/images/book_8.jpg', 'cbba'),
    new Answer('Замятин Е. И. – «Мы»', 'test_page/images/book_9.jpg', 'cacb'),
] // Список ответов


function Question(question, a, b, c) {
    this.question = question;
    this.a = a;
    this.b = b;
    this.c = c;
} // Конструктор вопроса


function Answer(bookName, bookImage, answer) {
    this.bookName = bookName;
    this.bookImage = bookImage;
    this.answer = Array.from(answer);
} // Конструктор ответа



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
                        if (![2, 5, 7, 8, 9, 10].includes(this.state.questionNumber + 1)) result.push("a");
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
                        if (![2, 5, 7, 8, 9, 10].includes(this.state.questionNumber + 1)) result.push("b");
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
                        if (![2, 5, 7, 8, 9, 10].includes(this.state.questionNumber + 1)) result.push("c");
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

    let resultBookIndex = mostAppropriateBook(result);

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
                    { className: "result__image", src: answerList[resultBookIndex].bookImage }   // Фото книги
                )
            ),
            e(
                'p',
                { className: "question__text" },
                answerList[resultBookIndex].bookName   // Книга
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



function mostAppropriateBook(result) {
    let apprAnswers = answerList.map(book => {
        let k = 0;
        book.answer.forEach((value, index) => { if (value == result[index]) k++ });
        return (book.answer[0] == result[0]) ? k : 0;
    });
    return apprAnswers.indexOf(Math.max.apply(null, apprAnswers));
}
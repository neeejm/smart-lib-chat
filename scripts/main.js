import { answerQuestion } from './core.js';

const response = document.querySelector('.response');

const animationSpeed = 2;

const animateResponse = (data) => {
  const answerContainer = document.createElement('div');
  answerContainer.className = 'answerContainer';
  const paragraph = document.createElement('p');
  paragraph.className = 'answer';
  paragraph.innerHTML = data;
  paragraph.style.width = `76vw`;
  // newParagraph.style.width = `${data.length}ch`;
  paragraph.style.WebkitAnimation = `typing ${animationSpeed}s steps(${data.length}, end)`;
  answerContainer.appendChild(paragraph);

  response.appendChild(answerContainer);
  window.scrollTo(0, document.body.scrollHeight);
};

const questionForm = document.querySelector('.questionForm');
questionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendQuery();
});
const question = document.querySelector('.question');
const sendBtn = document.querySelector('.sendButton');
sendBtn.addEventListener('click', () => {
  sendQuery();
});

function sendQuery() {
  const queryContainer = document.createElement('div');
  queryContainer.className = 'queryContainer';
  const paragraph = document.createElement('p');
  paragraph.className = 'query';
  paragraph.innerHTML = question.value;
  queryContainer.appendChild(paragraph);
  response.appendChild(queryContainer);

  const result = answerQuestion(question.value);

  animateResponse(result);

  question.value = '';
}

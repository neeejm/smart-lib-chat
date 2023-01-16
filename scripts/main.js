import { answerQuestion } from './core.js';

const response = document.querySelector('.response');

const animationSpeed = 2;

const animateResponse = (data) => {
  response.value = data;
  const newAnswerContainer = document.createElement('div');
  newAnswerContainer.className = 'answerContainer';
  const newParagraph = document.createElement('p');
  newParagraph.className = 'answer';
  newParagraph.innerHTML = data;
  newParagraph.style.width = `80vw`;
  // newParagraph.style.width = `${data.length}ch`;
  newParagraph.style.WebkitAnimation = `typing ${animationSpeed}s steps(${data.length}, end)`;
  newAnswerContainer.appendChild(newParagraph);

  const span = document.createElement('span');
  newAnswerContainer.appendChild(span);

  response.appendChild(newAnswerContainer);
  window.scrollTo(0, document.body.scrollHeight);
};

const chatGPTForm = document.querySelector('.questionForm');
chatGPTForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendQuery();
});
const chatGPTQuestion = document.querySelector('.question');
const sendBtn = document.querySelector('.sendButton');
sendBtn.addEventListener('click', () => {
  sendQuery();
});

function sendQuery() {
  const newQueryContainer = document.createElement('div');
  newQueryContainer.className = 'queryContainer';
  const newParagraph = document.createElement('p');
  newParagraph.className = 'query';
  newParagraph.innerHTML = chatGPTQuestion.value;
  newQueryContainer.appendChild(newParagraph);
  response.appendChild(newQueryContainer);

  const result = answerQuestion(chatGPTQuestion.value);

  animateResponse(result);

  chatGPTQuestion.value = '';
}

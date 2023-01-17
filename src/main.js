import { answerQuestion } from './core.js';

const response = document.querySelector('.response');
const question = document.querySelector('.question');

const questionForm = document.querySelector('.questionForm');
questionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendQuery();
});

const sendBtn = document.querySelector('.sendButton');
sendBtn.addEventListener('click', () => {
  sendQuery();
});

const animationSpeed = 2;

const animateResponse = (data) => {
  const answerContainer = document.createElement('div');
  answerContainer.className = 'answerContainer';
  const paragraph = document.createElement('p');
  paragraph.className = 'answer';
  paragraph.innerHTML = data;
  paragraph.style.width = `77vw`;
  // paragraph.style.width = `${data.length}ch`;
  paragraph.style.WebkitAnimation = `typing ${animationSpeed}s steps(${data.length}, end)`;
  answerContainer.appendChild(paragraph);

  response.appendChild(answerContainer);
  window.scrollTo(0, document.body.scrollHeight);
};

const formatHtmlCode = () => {
  const htmlCodes = document.querySelectorAll('code.language-markup');

  if (htmlCodes.length > 0) {
    htmlCodes[htmlCodes.length - 1].innerHTML = prettier.format(
      htmlCodes[htmlCodes.length - 1].innerHTML,
      { parser: 'html', plugins: prettierPlugins }
    );
  }
};

const formatJsCode = () => {
  const jsCodes = document.querySelectorAll('code.language-javascript');
  if (jsCodes.length > 0) {
    try {
      jsCodes[jsCodes.length - 1].innerHTML = prettier.format(
        jsCodes[jsCodes.length - 1].innerText,
        {
          parser: 'babel',
          plugins: prettierPlugins
        }
      );
    } catch {}
    try {
      jsCodes[jsCodes.length - 1].innerHTML = prettier.format(
        jsCodes[jsCodes.length - 1].innerText,
        {
          parser: 'angular',
          plugins: prettierPlugins
        }
      );
    } catch {}
  }
};

const sendQuery = () => {
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
  formatJsCode();
  Prism.highlightAll();
  formatHtmlCode();
};

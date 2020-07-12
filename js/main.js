'use strict';

{
  const quizSet = shuffle([
    {
      q: '欧介を留学中にふった女性の名前は？',
      c: [
          '雪子',
          '桜子',
          '南',
          '幸恵'
         ]
    },
    {
      q: '欧介が慶明大学卒業後どこの大学に留学したでしょう？',
      c: [
          'マサチューセッツ工科大学',
          'ハーベリー工科大学',
          'サースシュベリアルト工科大学',
          'カーキルー工科大学'
         ]
    },
    {
      q: '最終回東十条は自分の事をなんと言ったか？',
      c: [
          '世界一のアッシー',
          '世界一のおしとよし',
          '世界一のラフ',
          '世界一のシッター'
         ]
    },
    {
      q: '佐久間　真理子が加入していたサークルは？',
      c: [
          '鉄道研究会',
          '調理研究会',
          '作服会',
          '茶道会'
         ]
    },
  ]);

  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  let currentNum = 0;
  let isAnswered;
  let score = 0;


  function shuffle(arr) {
    for (let i = arr.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  };

  function checkAnswer(li){
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');

  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length -1) {
      btn.textContent = '結果を見る';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      // console.log(`Score: ${score} / ${quizSet.length}`);
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
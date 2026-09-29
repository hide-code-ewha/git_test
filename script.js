// script.js
// LOOP / 미디어 아트 코딩 스튜디오
// p5.js(instance mode)로 만든 3개의 인터랙티브 레슨 + 탭 전환 + 퀴즈로 다음 레슨 잠금 해제

// ===============================================
// 상태값
// ===============================================
let currentLesson = 1;
const unlocked = { 1: true, 2: false, 3: false };

const lessonTitles = {
  1: '변수로 색상과 크기 다루기',
  2: '조건문으로 장면 전환하기',
  3: '반복문으로 움직임 만들기',
};

// 레슨별 퀴즈 데이터: 정답을 맞히면 다음 레슨이 열립니다.
const quizzes = {
  1: {
    label: 'Q. 01',
    question: '원의 크기를 바꾸고 싶을 때<br>어떤 값을 수정해야 할까요?',
    answers: [
      { text: 'A. circleColor', correct: false },
      { text: 'B. circleSize', correct: true },
      { text: 'C. canvas', correct: false },
    ],
    correctFeedback: '정답이에요! circleSize가 원의 크기를 담고 있어요. 다음 레슨이 열렸습니다 ✦',
    wrongFeedback: '아쉬워요. 크기를 뜻하는 변수 이름을 다시 찾아보세요.',
    progressAfter: 45,
  },
  2: {
    label: 'Q. 02',
    question: 'hour가 20일 때, 위 코드는<br>어떤 배경을 그릴까요?',
    answers: [
      { text: "A. background('#bfe6ff') 낮 하늘", correct: false },
      { text: "B. background('#1b1b3a') 밤 하늘", correct: true },
      { text: 'C. 아무것도 그리지 않는다', correct: false },
    ],
    correctFeedback: '정답이에요! 20은 18보다 크니까 else 블록이 실행돼서 밤하늘이 그려져요. 다음 레슨이 열렸습니다 ✦',
    wrongFeedback: '다시 확인해보세요. hour가 18보다 작은지 아닌지가 기준이에요.',
    progressAfter: 70,
  },
  3: {
    label: 'Q. 03',
    question: "for (let i = 0; i &lt; count; i++) 를 실행하면<br>중괄호 안의 코드는 몇 번 반복될까요?",
    answers: [
      { text: 'A. count번', correct: true },
      { text: 'B. count + 1번', correct: false },
      { text: 'C. 무한히', correct: false },
    ],
    correctFeedback: '정답이에요! i가 0부터 count-1까지 움직이면서 정확히 count번 반복돼요. 모든 레슨을 완료했습니다 🎉',
    wrongFeedback: '힌트: i는 0에서 시작해서 count보다 작을 때까지만 반복돼요.',
    progressAfter: 100,
  },
};

// ===============================================
// 01. 변수 (Variable): 색상과 크기를 담는 상자
// ===============================================
const sketch1 = function (p) {
  let circleSize = 120;
  let circleColor = '#FF5C35';

  p.setup = function () {
    p.createCanvas(520, 310);
    p.noStroke();
    p.noLoop(); // 값이 바뀔 때만 다시 그리면 되므로 자동 반복은 꺼둡니다.
  };

  p.draw = function () {
    p.background('#f3f0e8');

    // 변수 하나만 바꿔도 장면 전체가 달라진다는 걸 보여주는 핵심 데모
    p.fill(circleColor);
    p.circle(200, 150, circleSize);

    p.fill('#f4e95d');
    p.circle(470, 40, 70);
    p.fill('#a69bf1');
    p.circle(60, 260, 45);
  };

  p.setCircleSize = function (value) {
    circleSize = value;
    p.redraw();
  };

  p.setCircleColor = function (value) {
    circleColor = value;
    p.redraw();
  };
};

const p5Lesson1 = new p5(sketch1, 'canvas-1');

const sizeRange = document.querySelector('#sizeRange');
const sizeOutput = document.querySelector('#sizeOutput');
const colorPicker = document.querySelector('#colorPicker');
const colorOutput = document.querySelector('#colorOutput');

function drawLesson1() {
  sizeOutput.textContent = sizeRange.value;
  colorOutput.textContent = colorPicker.value.toUpperCase();
  p5Lesson1.setCircleSize(Number(sizeRange.value));
  p5Lesson1.setCircleColor(colorPicker.value);
}

sizeRange.addEventListener('input', drawLesson1);
colorPicker.addEventListener('input', drawLesson1);
document.querySelector('#runButton1').addEventListener('click', drawLesson1);
drawLesson1();

// ===============================================
// 02. 조건문 (if): hour 값 하나로 낮/밤 장면을 나눔
// ===============================================
const sketch2 = function (p) {
  let hour = 9;

  p.setup = function () {
    p.createCanvas(520, 310);
    p.noStroke();
    p.noLoop();
  };

  p.draw = function () {
    // 조건문: hour가 18보다 작으면 낮, 아니면 밤
    if (hour < 18) {
      p.background('#bfe6ff');
      p.fill('#ffd23f');
      p.circle(p.map(hour, 0, 18, 50, 470), 80, 70);
    } else {
      p.background('#1b1b3a');
      p.fill('#f4e95d');
      p.circle(p.map(hour, 18, 23, 50, 470), 80, 45);
      p.fill(255, 255, 255, 220);
      for (let i = 0; i < 30; i++) {
        p.circle((i * 173) % 520, (i * 97) % 200, 2);
      }
    }

    p.fill('#20201e');
    p.textSize(13);
    p.textFont('monospace');
    p.text(`${hour}:00`, 20, 290);
  };

  p.setHour = function (value) {
    hour = value;
    p.redraw();
  };
};

const p5Lesson2 = new p5(sketch2, 'canvas-2');

const hourRange = document.querySelector('#hourRange');
const hourOutput = document.querySelector('#hourOutput');

function drawLesson2() {
  const hour = Number(hourRange.value);
  hourOutput.textContent = hour < 18 ? `${hour}시 ・ ☀️ 낮` : `${hour}시 ・ 🌙 밤`;
  p5Lesson2.setHour(hour);
}

hourRange.addEventListener('input', drawLesson2);
document.querySelector('#runButton2').addEventListener('click', drawLesson2);
drawLesson2();

// ===============================================
// 03. 반복문 (loop): for문 + draw()의 자동 반복 = 움직임
// ===============================================
const sketch3 = function (p) {
  let count = 8;
  let speed = 30;

  p.setup = function () {
    p.createCanvas(520, 310);
    p.noStroke();
  };

  p.draw = function () {
    p.background('#f3f0e8');

    // for 반복문: count번 만큼 같은 규칙으로 원을 그림
    for (let i = 0; i < count; i++) {
      const x = 50 + i * (420 / Math.max(count - 1, 1));
      const y = 155 + Math.sin(p.frameCount * (speed / 3000) + i * 0.6) * 70;
      const t = i / Math.max(count - 1, 1);
      p.fill(p.lerpColor(p.color('#ff5c35'), p.color('#a69bf1'), t));
      p.circle(x, y, 28);
    }
  };

  p.setCount = function (value) {
    count = value;
  };

  p.setSpeed = function (value) {
    speed = value;
  };

  p.toggleLoop = function () {
    if (p.isLooping()) {
      p.noLoop();
      return false;
    }
    p.loop();
    return true;
  };
};

const p5Lesson3 = new p5(sketch3, 'canvas-3');

const countRange = document.querySelector('#countRange');
const countOutput = document.querySelector('#countOutput');
const speedRange = document.querySelector('#speedRange');
const speedOutput = document.querySelector('#speedOutput');
const runButton3 = document.querySelector('#runButton3');

countRange.addEventListener('input', function () {
  countOutput.textContent = countRange.value;
  p5Lesson3.setCount(Number(countRange.value));
});

speedRange.addEventListener('input', function () {
  speedOutput.textContent = speedRange.value;
  p5Lesson3.setSpeed(Number(speedRange.value));
});

runButton3.addEventListener('click', function () {
  const isPlaying = p5Lesson3.toggleLoop();
  runButton3.textContent = isPlaying ? '⏸ 애니메이션 멈추기' : '▶ 애니메이션 다시 시작';
});

// ===============================================
// 레슨 탭 전환
// ===============================================
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.lesson-panel');
const practiceTitle = document.querySelector('#practiceTitle');
const practiceStep = document.querySelector('#practiceStep');

function switchLesson(n) {
  if (!unlocked[n]) return;

  currentLesson = n;

  tabs.forEach((tab) => tab.classList.toggle('active', Number(tab.dataset.lesson) === n));
  panels.forEach((panel) => panel.classList.toggle('active', Number(panel.dataset.panel) === n));

  practiceTitle.textContent = lessonTitles[n];
  practiceStep.textContent = `실습 0${n} / 03`;

  renderQuiz(n);
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => switchLesson(Number(tab.dataset.lesson)));
});

document.querySelectorAll('[data-goto]').forEach((link) => {
  link.addEventListener('click', () => switchLesson(Number(link.dataset.goto)));
});

// ===============================================
// 레슨 목록의 진행 상태 뱃지 갱신 (잠김 / 학습 중 / 완료)
// ===============================================
function updateLessonStatus(n, status) {
  const row = document.querySelector(`#lessonRow-${n}`);
  const badge = document.querySelector(`#status-${n}`);
  if (!row || !badge) return;

  row.classList.remove('current', 'done');
  badge.dataset.status = status;

  if (status === 'locked') {
    badge.innerHTML = '🔒 잠금 해제 전';
  } else if (status === 'current') {
    row.classList.add('current');
    badge.innerHTML = '<mark>학습 중</mark>';
  } else if (status === 'done') {
    row.classList.add('done');
    badge.innerHTML = '<mark class="done">✓ 완료</mark>';
  }
}

// ===============================================
// 퀴즈 렌더링 + 채점 + 다음 레슨 잠금 해제
// ===============================================
const quizStep = document.querySelector('#quizStep');
const quizLabel = document.querySelector('#quizLabel');
const quizQuestion = document.querySelector('#quizQuestion');
const quizAnswers = document.querySelector('#quizAnswers');
const quizFeedback = document.querySelector('#quizFeedback');
const progressText = document.querySelector('#progressText');
const progressNote = document.querySelector('#progressNote');

function renderQuiz(n) {
  const quiz = quizzes[n];

  quizStep.textContent = `${n} / 3　${'━'.repeat(n)}${'─'.repeat(3 - n)}`;
  quizLabel.textContent = quiz.label;
  quizQuestion.innerHTML = quiz.question;
  quizFeedback.textContent = '';
  quizFeedback.style.color = '';

  quizAnswers.innerHTML = '';
  quiz.answers.forEach((answer) => {
    const btn = document.createElement('button');
    btn.textContent = answer.text;
    btn.dataset.answer = answer.correct ? 'correct' : 'wrong';
    btn.addEventListener('click', () => handleAnswer(n, btn, answer.correct));
    quizAnswers.appendChild(btn);
  });
}

function handleAnswer(n, button, isCorrect) {
  const quiz = quizzes[n];

  quizAnswers.querySelectorAll('button').forEach((b) => b.classList.remove('correct', 'wrong'));

  if (isCorrect) {
    button.classList.add('correct');
    quizFeedback.textContent = quiz.correctFeedback;
    quizFeedback.style.color = '';

    progressText.textContent = `${quiz.progressAfter}%`;
    updateLessonStatus(n, 'done');

    const next = n + 1;
    if (unlocked[next] !== undefined) {
      unlocked[next] = true;
      const nextTab = document.querySelector(`.tab[data-lesson="${next}"]`);
      nextTab.disabled = false;
      nextTab.textContent = `0${next} · ${next === 2 ? '조건문' : '반복문'}`;
      updateLessonStatus(next, 'current');
      progressNote.textContent = `${lessonTitles[n]} 실습을 완료했어요`;
    } else {
      progressNote.textContent = '모든 레슨을 완료했어요! 🎉';
    }
  } else {
    button.classList.add('wrong');
    quizFeedback.textContent = quiz.wrongFeedback;
    quizFeedback.style.color = '#af432a';
  }
}

// 시작 시 1번 퀴즈 표시
renderQuiz(1);

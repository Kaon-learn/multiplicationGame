'use strict';
const startButton = document.getElementById('start');
const questionDivided = document.getElementById('question-area');
const answerDivided = document.getElementById('answer-area');
const resultDivided = document.getElementById('result-area');
// [掛けられる数, 掛ける数, 積]の配列
let questionAndSolution = null;

// 出題ボタンが押されたことを検知
startButton.onclick = () => {
    // 新しく出題するときに前の問題のリザルトを消す
    resultDivided.innerText = '';

    // 難易度を取得
    let difficulty = null;
    for(let i = 0; i < 3; i++){
        if(document.form1.difficulty[i].checked){
            difficulty = i + 1;
            break;
        }
    }

    // 難易度を作問関数に渡す
    createQestion(difficulty);

    // 出題
    question();
}

/** 難易度を渡すと問題と解答を返す関数
 * @param {} difficulty 難易度
 */
function createQestion(difficulty) {
    // 掛ける数と掛けられる数の2つを宣言
    let number0 = 0;
    let number1 = 0;

    // 難易度に応じた桁数の数を代入
    // このループはdifficulty(=生成したい数の桁数)と同じ回数ループする
    for(let i = 0, tmp = 0; i < difficulty; i++){
        // 最後のループは0が生成されると桁数が減ってしまうので1~9しか生成されないよう分けて処理
        if(i === difficulty - 1){
            tmp = Math.random() * 9 + 1;
            number0 += Math.floor(tmp) * (10 ** i);
            break;
        }
        // 整数部分が0~9の乱数を生成
        tmp = Math.random() * 10;
        // 小数部分を捨てて10**iの位に加算
        number0 += Math.floor(tmp) * (10 ** i);
    }
    for(let i = 0, tmp = 0; i < difficulty; i++){
        if(i === difficulty - 1){
            tmp = Math.random() * 9 + 1;
            number1 += Math.floor(tmp) * (10 ** i);
            break;
        }
        tmp = Math.random() * 10;
        number1 += Math.floor(tmp) * (10 ** i);
    }

    // 生成した数を配列へ
    const solution = number0 * number1;
    questionAndSolution = [number0, number1, solution];
}

function question() {
    // TODO 出題処理
    questionDivided.innerText = '';
    let questionText = document.createElement('h3');
    questionText.innerText = questionAndSolution[0] + '×' + questionAndSolution[1];
    questionDivided.appendChild(questionText);

    // answer-areaにテキストエリアと回答ボタンを設置
    // いくつも表示されるのを防ぐため初期化
    answerDivided.innerText = '';
    // addAnswerTextBoxにinput要素を代入し属性をまとめる
    let addAnswerTextBox = document.createElement('input');
    addAnswerTextBox.setAttribute('type', 'text');
    addAnswerTextBox.setAttribute('id', 'answer');
    addAnswerTextBox.setAttribute('size', '50');
    addAnswerTextBox.setAttribute('maxlength', '6');
    // addAnswerButtonにinput要素を代入し属性をまとめる
    let addAnswerButton = document.createElement('input');
    addAnswerButton.setAttribute('type', 'button');
    addAnswerButton.setAttribute('id', 'answer-button');
    addAnswerButton.setAttribute('value', '回答');
    // 押されたらjudgementを呼び出すよう設定
    addAnswerButton.setAttribute('onclick', 'judgement();');
    // answer-areaの子要素に
    answerDivided.appendChild(addAnswerTextBox);
    answerDivided.appendChild(addAnswerButton);
}

// 正誤判定
function judgement() {
    // 解答入力フォームの内容を取得
    const answerInput = document.getElementById('answer');
    const answerNum = answerInput.value;
    // 文字が入力されていない場合に処理を中止する
    if(answerNum.length === 0){
        return;
    }

    // 正誤判定
    let judge = null;
    let solution = questionAndSolution[2].toString();
    if(answerNum === solution) {
        judge = true;
    }
    else {
        judge = false;
    }
    
    // resultに判定結果を引数に呼び出す
    result(judge);
}

function result(judge) {
    // judgeに応じてリザルトのテキストを変更
    let resultText = null;
    if(judge) {
        resultText = '正解です！';
    } 
    else {
        resultText = '残念……  ' + questionAndSolution[2] + 'が正解でした。';
    }
    // いくつも表示されるのを防ぐため初期化
    resultDivided.innerText = '';
    // addResultにp要素を代入し属性をまとめる
    let addResultText = document.createElement('p');
    addResultText.innerText = resultText;
    // result-areaの子要素に
    resultDivided.appendChild(addResultText);
}
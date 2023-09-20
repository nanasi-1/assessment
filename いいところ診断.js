'use strict'
const area = { //HTMLのタグの情報を持ってくる オブジェクトにしてみた
    start_button: document.getElementById('start_button'),
    result_area: document.getElementById('result_area'),
    tweet_area: document.getElementById('tweet_area'),
    user_name: document.getElementById('user_name'),
}
area.start_button.onclick = () => {
    const userName = area.user_name.value;
    if (userName.length === 0) { //入力欄が空の時は下の処理を実行しない
        return;
    }
    area.result_area.innerText = ''; //ここから結果表示エリア
    const result_h3 = document.createElement('h3')
    result_h3.innerText = '診断結果';
    area.result_area.appendChild(result_h3);
    const result_p = document.createElement('p');
    const result = assessment(userName); //ありさんは37153
    result_p.innerText = result
    area.result_area.appendChild(result_p);

    area.tweet_area.innerText = ''; //ここからツイートエリア
    const tweet_a = document.createElement('a');
    const tweet_hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw'; //エラー出なかったしこれで良いよね()
    tweet_a.setAttribute('href', tweet_hrefValue);
    tweet_a.setAttribute('class', 'twitter-hashtag-button');
    tweet_a.setAttribute('data_text', result);
    tweet_a.innerText = 'Tweet #あなたのいいところ';
    area.tweet_area.appendChild(tweet_a);

    const tweet_script = document.createElement('script') //ここでただのリンクをボタンにしてるらしい
    tweet_script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    area.tweet_area.appendChild(tweet_script)
}

area.user_name.onkeydown = event =>{
    if (event.key === 'Enter') {
        area.start_button.onclick();
    }
}

const answers = [
    '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
    '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
    '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
    '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
    '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
    '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
    '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
    '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
    '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
    '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
    '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
    '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
    '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
    '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
    '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
    '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
    '###userName###のいいところは優しさです。###userName###の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
    '###userName###のいいところはありません。乙でーすwww'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    let textNumber = 0;
    for (let i = 0; i < userName.length; i++) {
        textNumber = textNumber + userName.charCodeAt(i);
    }
    let result = answers[textNumber % (answers.length - 1)];
    //if (userName === '無') {　まずそうなため削除
    //    result = answers[answers.length - 1];
    //}
    result = result.replaceAll('###userName###',userName);
    console.log(result);
    return result
}

// 시간 변환 함수 START
function dateToStr(format) {
    var year = format.getFullYear();

    var month = format.getMonth() + 1;
    if(month < 10) month = '0' + month;

    var date = format.getDate();
    if(date < 10) date = '0' + date;

    var hour = format.getHours();
    if(hour < 10) hour = '0' + hour;

    var min = format.getMinutes();
    if(min < 10) min = '0' + min;

    var sec = format.getSeconds();
    if(sec < 10) sec = '0' + sec;

    return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
}

function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 30) {
        return `${betweenTimeDay}일전`;
    }

    const betweenTimeMonth = Math.floor(betweenTime / 60 / 24 / 30);
    if (betweenTimeMonth < 12) {
        return `${betweenTimeMonth}달전`;
    }

    return dateToStr(timeValue);
}
// 시간 변환 함수 END

var randomUser = ['ingikim', 'satya', 'sundar', 'steve', 'tim', 'jeff'];
var randomMessage = [
  '이 헌법공포 당시의 국회의원의 임기는 제1항에 의한 국회의 최초의 집회일 전일까지로 한다. 감사원은 원장을 포함한 5인 이상 11인 이하의 감사위원으로 구성한다.',
  '헌법재판소의 조직과 운영 기타 필요한 사항은 법률로 정한다. 모든 국민은 자기의 행위가 아닌 친족의 행위로 인하여 불이익한 처우를 받지 아니한다.',
  '헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다. 국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다.',
  '모든 국민은 직업선택의 자유를 가진다. 군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. 행정권은 대통령을 수반으로 하는 정부에 속한다.',
  '민주평화통일자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 국가는 농·어민과 중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과 발전을 보장한다.',
  '국회는 국정을 감사하거나 특정한 국정사안에 대하여 조사할 수 있으며, 이에 필요한 서류의 제출 또는 증인의 출석과 증언이나 의견의 진술을 요구할 수 있다.',
  '인간이 얼음에 고행을 따뜻한 가장 이것이다. 꽃이 곧 동력은 끝에 동산에는 그것은 거선의 별과 인생의 것이다. 구하지 착목한는 스며들어 인생의 것이다.',
  '새 가슴에 있는 만천하의 있다. 몸이 뜨거운지라, 청춘의 소리다.이것은 같으며, 피다. 설산에서 힘차게 옷을 피다. 놀이 그들의 인간의 주는 소금이라',
  '귀는 우리는 피에 무엇이 이것이다. 구하지 우리는 그들은 약동하다. 따뜻한 발휘하기 사람은 충분히 사막이다.'
]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomTweet() {
  let user = randomUser[getRandomInt(0, randomUser.length)];
  let message = randomMessage[getRandomInt(0, randomMessage.length)];
  let created_at = new Date(); 

  generateTweet(user, message, created_at);

  localData.unshift({name: user, comment: message, createdAt: created_at});
  localStorage.setItem('data', JSON.stringify(localData)); // 새로 만든 트윗 로컬 스토리지에 데이터 업데이트
}

// 트윗 HTML 코드 생성
function generateTweet(name, comment, createdAt, newCheck = true) {
    let parent = document.getElementById('tweet-list');
    let el = document.createElement('div');
    let tweetElem = document.createElement('div');
    let nameDiv = document.createElement('div');
    let contentDiv = document.createElement('div');
    let dateDiv = document.createElement('div');
    let hr = document.createElement('hr');

    el.setAttribute('class', 'tweet-text');

    nameDiv.textContent = name;
    nameDiv.setAttribute('class', 'name');
    nameDiv.addEventListener('click', filterUserTweet); // 작성자 필터링을 위한 이벤트 생성

    contentDiv.textContent = comment;
    contentDiv.setAttribute('class', 'tweet-content');

    dateDiv.textContent = timeForToday(createdAt);
    dateDiv.setAttribute('class', 'tweet-date');

    tweetElem.append(nameDiv, contentDiv);

    el.append(tweetElem, dateDiv);

    // 새롭게 생성 된 트윗을 맨 위에 표시하기 위한 체크 로직
    if(newCheck) { parent.prepend(el, hr); } 
    else { parent.append(el, hr); }
}

// 불러온 트윗 데이터를 트윗 글 목록에 생성하는 함수
function generateDataTweet() {
    localData.forEach((elem) => {
        generateTweet(elem.name, elem.comment, elem.createdAt, false);
    });
}


// 새로운 트윗을 생성하는 함수
function generateNewTweet(event) {
    let _createdAt = dateToStr(new Date());
    let _name = document.getElementById('username').value;
    let _comment = document.getElementById('comment').value;

    if(_name.length === 0 || _comment.length === 0) {
        alert('빈 문자로 트윗을 생성 할 수 없습니다.');
        return;
    }
    
    generateTweet(_name, _comment, _createdAt);

    localData.unshift({name: _name, comment: _comment, createdAt: _createdAt});
    localStorage.setItem('data', JSON.stringify(localData)); // 새로 만든 트윗 로컬 스토리지에 데이터 업데이트

    // 입력 이후 입력 창의 값을 비워줌
    document.getElementById('username').value = '';
    document.getElementById('comment').value = '';
}

// 작성자 필터 함수
function filterUserTweet(event) {
    let filterUser = event.target.textContent;
    // 모든 글을 지운 후
    document.querySelectorAll('.tweet-text').forEach((elem) => { elem.remove(); });
    document.querySelectorAll('hr').forEach((elem) => { elem.remove(); });

    // 선택한 작성자의 트윗 글만 생성함
    localData.forEach((elem) => {
        if(filterUser === elem.name) {
            generateTweet(elem.name, elem.comment, elem.createdAt, false);
        }
    });
}

// 로컬 스토리지에 값이 없을 때
if(!localStorage.getItem('data')) {
    // 미리 정의된 DATA 변수 값을 저장함
    localStorage.setItem('data', JSON.stringify(DATA));
}

// 로컬 스토리지에 저장된 값을 가져옴
let localData = JSON.parse(localStorage.getItem('data'));

// 로컬 스토리지에 저장된 값으로 트윗 글 생성
generateDataTweet();

// 트윗 생성 버튼 이벤트 생성
let tweetButton = document.querySelector('.tweet-button')
                        .addEventListener('click', generateNewTweet);

// data.js에 정의 되어있는 변수 값 제외 한 새로 생성된 트윗 삭제
document.querySelector('#tweet-clear-button').addEventListener('click', (e) => {
    localStorage.clear();
    location.reload();
});

document.querySelector('#tweet-random-button').addEventListener('click', generateRandomTweet);

// Before filter tweet! 버튼 클릭 시 새로고침
document.querySelector('#tweet-before-filter').addEventListener('click', (e) => {
    location.reload();
});

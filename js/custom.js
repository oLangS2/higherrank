//스크롤 이벤트 .scroll_hidden 가지고 있는 요소가 화면에 나타날 때 .scroll_animate를 추가 
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('scroll_animate', entry.isIntersecting);
  });
});

const observeHiddenElements = () => {
  const hiddenElements = document.querySelectorAll('.scroll_hidden');
  hiddenElements.forEach((element) => observer.observe(element));
};

observeHiddenElements(); 

//portfolio 각 item 클릭 시 각 modal 열리고 닫힘
const conItems = document.querySelectorAll('.item');

conItems.forEach(conItem => {
  conItem.addEventListener('click', function () {
    const modalId = this.getAttribute('data-modal');
    document.getElementById(modalId).classList.add('open');
  });
});

const modalTrigger = document.querySelector('.modal .header .trigger');
const modals = document.querySelectorAll('.modal');

modals.forEach(modal => {

  modal.querySelector('.header .trigger').addEventListener('click', function (event) {
    modal.classList.remove('open');
  });
});

//portfolio more_btn 누르면 숨겨져있는 con_2 펼쳐지고 닫힘
const doDisplay = true;

function scrollToElement(element) {
  window.scrollTo({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop
  });
}

document.addEventListener('DOMContentLoaded', function () {

  const moreBtn = document.querySelector(".more_btn");
  const con = document.getElementById("con_2");
  const portfolio = document.getElementById("portfolio");


  moreBtn.addEventListener('click', function () {
    if (con.style.display === 'none' || con.style.display === '') {

      con.style.display = 'grid';
      moreBtn.classList.add('close');
    } else {
      con.style.display = 'none';
      moreBtn.classList.remove('close');

      scrollToElement(portfolio);
    }
  });
});

//무한반복스트롤 marquee 
const pTag1 = document.querySelector('.first-parallel')
const pTag2 = document.querySelector('.second-parallel')

const textArr1 = 'AIM HIGH FLY HIGHER * AIM HIGH FLY HIGHER * AIM HIGH FLY HIGHER * '.split(' ')
const textArr2 = 'Towards a higher value * Towards a higher value * Towards a higher value *'.split(' ')

// 위 배열을 똑같은 내용을 뒤에 push 해준 뒤 각각의 단어를 for 문으로 돌며,
// 단어뒤에 띄어쓰기 두번처리 한 후 각각의 p태그 안에 삽입한다.
function initTexts(element, textArray) {
  textArray.push(...textArray)
  for (let i = 0; i < textArray.length; i++) {
    element.innerText += `${textArray[i]}\u00A0\u00A0`
  }
}

initTexts(pTag1, textArr1)
initTexts(pTag2, textArr2)

let count1 = 0
let count2 = 0

//count가 element의 절반값 이상이라면 count 를 0, element도 초기화
function marqueeText(count, element, direction) {
  if (count > element.scrollWidth / 2) {
    element.style.transform = `translateX(0)`
    count = 0
  }
  //count에 direction을 곱한만큼 이동시켜주고 count를 return시켜 다음 animate 함수에 반영된다.
  element.style.transform = `translateX(${direction * count}px)`

  return count
}

function animate() {
  count1++
  count2++

  count1 = marqueeText(count1, pTag1, -1)
  count2 = marqueeText(count2, pTag2, 1)

  // 끈김없이 무한 반복된다.
  window.requestAnimationFrame(animate)
}

//실행
animate()

//family site button 클릭시 ul이 슬라이드 되는 on 클래스 토글
const familySite = document.querySelector('.footer_right .family_site');
const familySiteBtn = document.querySelector('.footer_right ul');

familySite.addEventListener('click' , () =>{
  familySiteBtn.classList.toggle('list')
});

//마우스 커서 커스텀
const cursorParent = document.getElementById('mouse-cursor')
const cursorChild = cursorParent.children[0]
document.addEventListener('mousemove', mousemove)

let scale = 1
let stage = ''
let cursorX = 0, cursorY = 0

//#mouse-cursor가 마우스 커서의 가운데를 따라다니게 됨 
function mousemove(e) {
  cursorX = e.pageX - cursorChild.offsetWidth / 2; // cursorChild의 크기 사용
  cursorY = e.pageY - cursorChild.offsetHeight / 2; // cursorChild의 크기 사용
  cursorParent.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;


  switch (e.target.getAttribute('data-cursor')) {
    //potfolio img_box 호버시 커서 커짐 + date-name ="click" 삽입 
    case 'Click':
      if (stage === 'Click') return
      scale = 5
      stage = 'Click'
      cursorChild.setAttribute('data-name', e.target.getAttribute('data-name'))
      cursorParent.className = 'cursor-text-mode'
      break
    case 'View':
      if (stage === 'View') return
      scale = 5
      stage = 'View'
      cursorChild.setAttribute('data-name', e.target.getAttribute('data-name'))
      cursorParent.className = 'cursor-text-mode'
      break
    //default 값
    default:
      if (stage === '') return
      scale = 1
      stage = ""
      cursorParent.className = ''
      cursorChild.removeAttribute('data-name')
      break
  }
  cursorChild.style.setProperty('--cursor-scale', scale)
}


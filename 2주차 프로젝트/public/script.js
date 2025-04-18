// 뉴스 요약 (빠른 뉴스) 처리
function handleSubmit() {
  const url = document.getElementById('news-url').value.trim();
  const text = document.getElementById('news-text').value.trim();
  const articleText = document.getElementById("article-text");
  const summaryText = document.getElementById("summary-text");
  
  if (!url && !text) {
    alert("URL 또는 뉴스 본문 중 하나는 입력해야 합니다.");
    return;
  }
  
  hideAllMain();
  document.getElementById('article-box').style.display = "block";
  document.getElementById('result-box').style.display = "block";
  
  if (url) {
    articleText.textContent = "[크롤링한 뉴스 기사 본문입니다 - 예시]";
  } else {
    articleText.textContent = text;
  }
  
  summaryText.textContent = "요약 중입니다...";
  setTimeout(() => {
    summaryText.textContent = "삼성전자는 1분기 사상 최대 실적을 기록하며 글로벌 시장에서 주목받고 있습니다.";
  }, 1000);
}

function resetForm() {
  hideAllMain();
  document.getElementById('form-box').style.display = "block";
  document.getElementById('news-url').value = "";
  document.getElementById('news-text').value = "";
}

// 키워드 기반 뉴스 요약 처리
function handleMultiSubmit() {
  const keywordsInput = document.getElementById('multi-news-url').value.trim();
  if (!keywordsInput) {
    alert("키워드를 입력하세요.");
    return;
  }
  hideAllMain();
  document.getElementById('multi-result-box').style.display = "block";
  let container = document.getElementById('multi-summary-container');
  container.innerHTML = "";
  
  // 쉼표나 줄바꿈 기준으로 키워드 분리
  let keywords = keywordsInput.split(/[\n,]+/).map(kw => kw.trim()).filter(kw => kw !== "");
  keywords.forEach((keyword, index) => {
    let div = document.createElement('div');
    div.className = "summary-box";
    div.innerHTML = `<h3>키워드: ${keyword}</h3>
                     <h3>요약 결과</h3>
                     <p>[${keyword} 관련 뉴스 요약 결과 예시]</p>`;
    container.appendChild(div);
  });
}

function resetMultiForm() {
  hideAllMain();
  document.getElementById('multi-form-box').style.display = "block";
  document.getElementById('multi-news-url').value = "";
}

// 도움말 및 제작자 연락처 페이지 처리
function openHelpPage() {
  hideAllMain();
  document.getElementById('help-box').style.display = "block";
}

function openContactPage() {
  hideAllMain();
  document.getElementById('contact-box').style.display = "block";
}

function backToDefault() {
  hideAllMain();
  document.getElementById('form-box').style.display = "block";
}

// 모든 메인 영역 숨기기 (숨길 때 자동 스크롤)
function hideAllMain() {
  const mains = document.getElementsByClassName('main');
  for (let i = 0; i < mains.length; i++) {
    mains[i].style.display = "none";
  }
  window.scrollTo(0, 0);
}

// 요약 결과 복사하기 (단일 뉴스)
function copySummary() {
  const summary = document.getElementById("summary-text").innerText;
  navigator.clipboard.writeText(summary)
    .then(() => alert("요약이 클립보드에 복사되었습니다."))
    .catch(() => alert("복사에 실패했습니다."));
}

// 요약 결과 인쇄하기 (단일 뉴스)
function printSummary() {
  const printContents = document.getElementById("result-box").innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  location.reload();
}

// 단일 뉴스 요약 저장하기
function saveCurrentSummary() {
  const article = document.getElementById("article-text").innerText;
  const summary = document.getElementById("summary-text").innerText;
  if (!summary || summary === "요약 중입니다...") {
    alert("저장할 요약 내용이 없습니다.");
    return;
  }
  const saved = JSON.parse(localStorage.getItem("savedSummaries") || "[]");
  const newEntry = { article, summary, date: new Date().toLocaleString() };
  saved.push(newEntry);
  localStorage.setItem("savedSummaries", JSON.stringify(saved));
  alert("요약이 저장되었습니다.");
  loadSavedSummaries();
}

// 다중 뉴스 요약 복사하기
function copyMultiSummary() {
  const container = document.getElementById("multi-summary-container");
  const text = container.innerText;
  navigator.clipboard.writeText(text)
    .then(() => alert("키워드 뉴스 요약이 클립보드에 복사되었습니다."))
    .catch(() => alert("복사에 실패했습니다."));
}

// 다중 뉴스 요약 인쇄하기
function printMultiSummary() {
  const printContents = document.getElementById("multi-result-box").innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  location.reload();
}

// 사이드바 저장된 요약 목록 불러오기
function loadSavedSummaries() {
  const saved = JSON.parse(localStorage.getItem("savedSummaries") || "[]");
  const list = document.getElementById("saved-summary-list");
  list.innerHTML = "";
  saved.forEach((entry, index) => {
    let div = document.createElement("div");
    div.className = "history-item";
    div.style.fontSize = "12px";
    div.style.margin = "5px 0";
    div.innerText = `${entry.date} - ${entry.summary.substring(0, 20)}...`;
    // 클릭 시 상세 내용을 보여주는 간단한 알림으로 처리
    div.onclick = () => alert(`기사 원문:\n${entry.article}\n\n요약:\n${entry.summary}`);
    list.appendChild(div);
  });
}

// 다크 모드 전환
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const toggleBtn = document.querySelector("button.submit.dark-mode-toggle");
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "라이트 모드 전환";
  } else {
    toggleBtn.textContent = "다크 모드 전환";
  }
}


// 로그인/회원가입/계정 복구 모달 처리
function openAuthModal() {
  document.getElementById('auth-modal').style.display = 'flex';
  showLoginStep(); // 기본은 로그인 화면
}

function closeAuthModal() {
  document.getElementById('auth-modal').style.display = 'none';
}

// 모달 내 단계 전환
function showLoginStep() {
  document.getElementById('login-step').style.display = 'block';
  document.getElementById('signup-step1').style.display = 'none';
  document.getElementById('signup-step2').style.display = 'none';
  document.getElementById('recover-step').style.display = 'none';
}

function showSignupStep() {
  document.getElementById('login-step').style.display = 'none';
  document.getElementById('signup-step1').style.display = 'block';
  document.getElementById('signup-step2').style.display = 'none';
  document.getElementById('recover-step').style.display = 'none';
}

function showSignupAuthStep() {
  document.getElementById('login-step').style.display = 'none';
  document.getElementById('signup-step1').style.display = 'none';
  document.getElementById('signup-step2').style.display = 'block';
  document.getElementById('recover-step').style.display = 'none';
}

function showRecoverStep() {
  document.getElementById('login-step').style.display = 'none';
  document.getElementById('signup-step1').style.display = 'none';
  document.getElementById('signup-step2').style.display = 'none';
  document.getElementById('recover-step').style.display = 'block';
}

// 로그인 처리
function handleLogin() {
  var email = document.getElementById('login-email').value.trim();
  var password = document.getElementById('login-password').value.trim();
  if (!email || !password) {
    alert("모든 필드를 입력해주세요.");
    return;
  }
  alert("로그인 시도!");
  closeAuthModal();
}

// 회원가입 처리 (1단계)
function handleSignup() {
  var email = document.getElementById('signup-email').value.trim();
  var password = document.getElementById('signup-password').value.trim();
  var confirm = document.getElementById('signup-confirm').value.trim();
  if (!email || !password || !confirm) {
    alert("모든 필드를 입력해주세요.");
    return;
  }
  if (password !== confirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  showSignupAuthStep();
}

// 인증 코드 처리 (회원가입 2단계)
function handleAuthCode() {
  var code = document.getElementById('auth-code-input').value.trim();
  if (!code) {
    alert("인증 코드를 입력하세요.");
    return;
  }
  alert("인증이 완료되었습니다. 회원가입이 완료되었습니다!");
  closeAuthModal();
}

// 계정 복구 처리
function handleRecover() {
  var email = document.getElementById('recover-email').value.trim();
  if (!email) {
    alert("이메일을 입력해주세요.");
    return;
  }
  alert("계정 복구 이메일이 전송되었습니다. 이메일을 확인해주세요.");
  closeAuthModal();
}

// 모달 내 화면 전환
function switchToSignup(event) {
  event.preventDefault();
  showSignupStep();
}

function switchToLogin(event) {
  event.preventDefault();
  showLoginStep();
}

function switchToRecover(event) {
  event.preventDefault();
  showRecoverStep();
}

// 사이드바 내 빠른 뉴스, 키워드 뉴스 요약 화면 전환
function handleQuickSummary() {
  hideAllMain();
  document.getElementById('form-box').style.display = "block";
}

function handleMultipleSummary() {
  hideAllMain();
  document.getElementById('multi-form-box').style.display = "block";
}

// 초기 로드 시 저장된 요약 불러오기
window.onload = function() {
  loadSavedSummaries();
};

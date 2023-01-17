import throttle from 'lodash.throttle';

const LOCAL_DATA = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};
let userData = {};
showAddedText();

refs.form.addEventListener('input', throttle(dataInputHendler, 500));
refs.form.addEventListener('submit', onSubmitBtn);

function dataInputHendler(e) {
  userData[e.target.name] = e.target.value;
  localStorage.setItem(LOCAL_DATA, JSON.stringify(userData));
}

function showAddedText() {
  const userLocalstorageData = JSON.parse(localStorage.getItem(LOCAL_DATA));
  if (userLocalstorageData?.email) {
    refs.input.value = userLocalstorageData.email;
  }
  if (userLocalstorageData?.message) {
    refs.textarea.value = userLocalstorageData.message;
  }
  userData = { ...userLocalstorageData };
}

function onSubmitBtn(e) {
  e.preventDefault();
  formDataCreate(e.currentTarget);
  e.currentTarget.reset();
  console.log(userData);
  localStorage.removeItem(LOCAL_DATA);
}

function formDataCreate(et) {
  const formData = new FormData(et);
  formData.forEach((nameKey, value) => {
    console.log(`${value} ==> ${nameKey}`);
  });
}

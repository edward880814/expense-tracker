const deleBtns = document.querySelectorAll(".deleBtn");
const modalBody = document.querySelector(".modal-body");
const modalFooter = document.querySelector(".modal-footer");

const handleDeleBtnClick = (e) => {
  const { id, name, date, amount } = e.target.dataset;
  const bodyContent = `
    <div>日期：${date}</div>
    <div>名稱：${name}</div>
    <div>金額：${amount}</div>
  `;
  modalBody.innerHTML = bodyContent;

  const form = modalFooter.querySelector("form");
  form.action = `/records/${id}?_method=DELETE`;
};

deleBtns.forEach((deleBtn) => {
  deleBtn.addEventListener("click", handleDeleBtnClick);
});

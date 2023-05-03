const deleBtns = document.querySelectorAll(".deleBtn");

const body = document.querySelector(".modal-body");

const footer = document.querySelector(".modal-footer");


deleBtns.forEach((deleBtn) => {
  deleBtn.addEventListener("click", (e) => {
    const { id, name, date, amount } = e.target.dataset;
    body.innerHTML = `
    <div>日期：${date}</div>
    <div>名稱：${name}</div>
    <div>金額：${amount}</div>
    `;


    footer.innerHTML = `<button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal">取消
          </button>
        
          <form action="/records/${id}?_method=DELETE" method="post">
          <button type="submit" class="btn btn-danger">
          刪除
          </button>
        </form>`;
    });
});


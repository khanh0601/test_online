import $ from "jquery";
import Cookies from "js-cookie"; 
import "./styles.scss";
$(document).ready(function () {
  const $taskList = $("#task-list");
  const $taskInput = $(".todo-add-input");
  const $addTaskBtn = $(".todo-add-submit");

  // Load tasks từ cookies khi trang load lại
  const savedTasks = Cookies.get("tasks");
  let tasks = savedTasks ? JSON.parse(savedTasks) : [];

  function saveTasks() {
    Cookies.set("tasks", JSON.stringify(tasks), { expires: 7 }); 
  }

  function renderTasks(filter = "all") {
    $taskList.empty();
    tasks.forEach((task, index) => {
      if (filter === "active" && task.completed) return;
      if (filter === "completed" && !task.completed) return;

      const taskClass = task.completed ? "completed" : "";
      const taskHTML = `
        <li class="todo-list-item ${taskClass}" data-index="${index}">
          <span class="task-text txt txt-20 txt-med">${task.text}</span>
          <button class="todo-list-item-complete">
          <svg width="100%" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_295_2836)">
            <path d="M138.85 214.68L200.19 213.86L204.76 215.05C226.28 227.46 245.54 242.95 262.22 261.36C284.23 225.95 307.67 193.44 332.44 163.54C359.57 130.77 388.36 101.05 418.6 73.92L424.59 71.62H491.52L478.03 86.61C436.55 132.7 398.92 180.33 364.92 229.45C330.9 278.62 300.49 329.37 273.45 381.61L265.04 397.85L257.3 381.31C229.07 320.72 189.27 269.12 133.85 231.07L138.85 214.68ZM255.98 0C294.43 0 332.16 8.56 366.82 25.2C369.05 26.27 370.01 28.98 368.94 31.22C368.63 31.86 368.19 32.4 367.66 32.82L330.12 63.54C329.481 64.0746 328.709 64.4243 327.885 64.5512C327.062 64.6781 326.22 64.5774 325.45 64.26C303.19 56.2 279.7 52.15 256.03 52.15C201.76 52.15 150.25 73.44 111.89 111.84C73.5 150.25 52.19 201.67 52.19 255.98C52.19 310.26 73.48 361.73 111.88 400.11C150.3 438.51 201.71 459.82 256.03 459.82C310.25 459.82 361.82 438.51 400.15 400.12C438.56 361.73 459.85 310.28 459.85 255.98C459.85 242.78 458.64 229.79 456.1 216.82C455.83 215.41 456.25 214 457.13 212.99L490.24 171.03C491.8 169.09 494.66 168.8 496.6 170.36C497.33 170.95 497.82 171.72 498.08 172.56C507.33 199.39 512 227.61 512 255.98C512 324.01 485.13 388.87 437.02 436.98C388.92 485.07 324.04 511.97 256.03 511.97C188 511.97 123.14 485.08 75.03 436.98L74.85 436.78C26.81 388.67 0 323.97 0 255.98C0 187.96 26.87 123.1 74.98 74.99L75.18 74.81C123.29 26.81 188.02 0 255.98 0Z" fill="currentColor"/>
            </g>
            <defs>
            <clipPath id="clip0_295_2836">
            <rect width="512" height="511.97" fill="white"/>
            </clipPath>
            </defs>                                   
          </svg>
          </button>
          <button class='todo-list-item-delete'>
          <svg width=" 100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 256 256" xml:space="preserve">
          <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
            <path d="M 71.854 90 H 18.147 c -3.398 0 -6.163 -2.765 -6.163 -6.163 V 11.653 c 0 -1.104 0.896 -2 2 -2 h 62.032 c 1.104 0 2 0.896 2 2 v 72.184 C 78.016 87.235 75.251 90 71.854 90 z M 15.984 13.653 v 70.184 c 0 1.192 0.97 2.163 2.163 2.163 h 53.707 c 1.192 0 2.162 -0.971 2.162 -2.163 V 13.653 H 15.984 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
            <path d="M 82.529 13.653 H 7.471 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 75.059 c 1.104 0 2 0.896 2 2 S 83.634 13.653 82.529 13.653 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
            <path d="M 59.434 13.653 H 30.566 c -1.104 0 -2 -0.896 -2 -2 v -5.49 C 28.566 2.765 31.331 0 34.729 0 h 20.541 c 3.398 0 6.163 2.765 6.163 6.163 v 5.49 C 61.434 12.757 60.538 13.653 59.434 13.653 z M 32.566 9.653 h 24.867 v -3.49 C 57.434 4.97 56.463 4 55.271 4 H 34.729 c -1.193 0 -2.163 0.97 -2.163 2.163 V 9.653 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
            <path d="M 56.02 76.538 c -1.104 0 -2 -0.896 -2 -2 V 25.112 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 49.426 C 58.02 75.643 57.124 76.538 56.02 76.538 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
            <path d="M 33.98 76.538 c -1.104 0 -2 -0.896 -2 -2 V 25.112 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 49.426 C 35.98 75.643 35.085 76.538 33.98 76.538 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          </g>
          </svg>
          </button>
        </li>
      `;
      $taskList.append(taskHTML);
    });
  }

  $addTaskBtn.click(() => {
    const taskText = $taskInput.val().trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      saveTasks();
      renderTasks();
      $taskInput.val(""); 
    }
  });

  $taskList.on("click", ".todo-list-item-delete", function () {
    const index = $(this).parent().data("index");
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  });
  $taskList.on("click", ".todo-list-item-complete", function () {
    const index = $(this).parent().data("index");
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  });

  $(".todo-filter-btn").click(function () {
    $(".todo-filter-btn").removeClass("active");
    $(this).addClass("active");
    const filter = $(this).data("filter");
    renderTasks(filter);
  });

  renderTasks();
});

(() => {
  "use strict";
  var e;
  !(function (e) {
    (e[(e.idea = 0)] = "idea"),
      (e[(e.active = 1)] = "active"),
      (e[(e.completed = 2)] = "completed");
  })(e || (e = {}));
  class t {
    constructor(e, t, n, r, s) {
      (this.id = e),
        (this.title = t),
        (this.description = n),
        (this.priority = r),
        (this.status = s);
    }
  }
  class n {
    constructor() {
      (this.listeners = []), (this.todoList = []);
    }
    static getInstance() {
      return this.instance || (this.instance = new n()), this.instance;
    }
    addListner(e) {
      this.listeners.push(e);
    }
    addTodo(n, r, s) {
      let i = "";
      const o =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
      for (let e = 1; e < 15; e++) {
        const e = Math.floor(74 * Math.random());
        i += o.charAt(e);
      }
      const l = new t(i, n, r, s, e.idea);
      this.todoList.push(l), this.updateTodo();
    }
    moveTodo(e, t) {
      const n = this.todoList.find((t) => t.id === e);
      n && ((n.status = t), this.updateTodo());
    }
    updateTodo() {
      for (const e of this.listeners) e(this.todoList.slice());
    }
  }
  const r = n.getInstance();
  function s(e, t, n) {
    const r = n.value;
    return {
      configurable: !0,
      get() {
        return r.bind(this);
      },
    };
  }
  function i(e) {
    let t = !0;
    return (
      e.required && (t = t && 0 !== e.value.trim().length),
      e.minLength &&
        "string" == typeof e.value &&
        (t = t && e.value.trim().length >= e.minLength),
      e.maxLength &&
        "string" == typeof e.value &&
        (t = t && e.value.trim().length <= e.maxLength),
      t
    );
  }
  class o {
    constructor(e, t, n) {
      (this.templateElement = document.getElementById(e)),
        (this.hostElement = document.getElementById(t));
      const r = document.importNode(this.templateElement.content, !0);
      (this.element = r.firstElementChild),
        n && (this.element.id = n),
        this.attach();
    }
    attach() {
      this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
  }
  var l = function (e, t, n, r) {
    var s,
      i = arguments.length,
      o =
        i < 3
          ? t
          : null === r
          ? (r = Object.getOwnPropertyDescriptor(t, n))
          : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(e, t, n, r);
    else
      for (var l = e.length - 1; l >= 0; l--)
        (s = e[l]) && (o = (i < 3 ? s(o) : i > 3 ? s(t, n, o) : s(t, n)) || o);
    return i > 3 && o && Object.defineProperty(t, n, o), o;
  };
  class a extends o {
    constructor() {
      super("todoAddTemp", "app"),
        (this.titleInputElement = this.element.querySelector("#title")),
        (this.descriptionInputElement =
          this.element.querySelector("#Description")),
        (this.priorityInputElement = this.element.querySelector("#Priority")),
        this.configure();
    }
    clearInputs() {
      (this.titleInputElement.value = ""),
        (this.descriptionInputElement.value = ""),
        (this.priorityInputElement.value = "low");
    }
    getTodoInfo() {
      const e = {
          value: this.titleInputElement.value,
          required: !0,
          minLength: 3,
        },
        t = {
          value: this.descriptionInputElement.value,
          required: !0,
          minLength: 3,
        },
        n = this.priorityInputElement.value;
      return i(e) && i(t)
        ? [e.value, t.value, n]
        : void alert("Please Fill All Inputs");
    }
    submitHandler(e) {
      e.preventDefault();
      const t = this.getTodoInfo();
      if (Array.isArray(t)) {
        const [e, n, s] = t;
        r.addTodo(e, n, s), this.clearInputs();
      }
    }
    renderContent() {}
    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }
  }
  l([s], a.prototype, "submitHandler", null);
  var d = function (e, t, n, r) {
    var s,
      i = arguments.length,
      o =
        i < 3
          ? t
          : null === r
          ? (r = Object.getOwnPropertyDescriptor(t, n))
          : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(e, t, n, r);
    else
      for (var l = e.length - 1; l >= 0; l--)
        (s = e[l]) && (o = (i < 3 ? s(o) : i > 3 ? s(t, n, o) : s(t, n)) || o);
    return i > 3 && o && Object.defineProperty(t, n, o), o;
  };
  class c extends o {
    constructor(e, t) {
      super("todoTemp", e, t.id),
        (this.todo = t),
        this.renderContent(),
        this.configure();
    }
    renderContent() {
      (this.element.querySelector("h3").textContent = this.todo.title),
        (this.element.querySelector("p").textContent = this.todo.description),
        (this.element.querySelector("span").textContent = this.todo.priority);
    }
    dragStartHandler(e) {
      this.element.classList.add("draggItem"),
        e.dataTransfer.setData("text/plain", this.todo.id),
        (e.dataTransfer.effectAllowed = "move");
    }
    dragEndHandler(e) {
      this.element.classList.remove("draggItem");
    }
    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler),
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
  }
  d([s], c.prototype, "dragStartHandler", null),
    d([s], c.prototype, "dragEndHandler", null);
  var h = function (e, t, n, r) {
    var s,
      i = arguments.length,
      o =
        i < 3
          ? t
          : null === r
          ? (r = Object.getOwnPropertyDescriptor(t, n))
          : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(e, t, n, r);
    else
      for (var l = e.length - 1; l >= 0; l--)
        (s = e[l]) && (o = (i < 3 ? s(o) : i > 3 ? s(t, n, o) : s(t, n)) || o);
    return i > 3 && o && Object.defineProperty(t, n, o), o;
  };
  class u extends o {
    constructor(t) {
      super("todoListTemp", "todos", `${t}-Todos`),
        (this.type = t),
        (this.assignedTodos = []),
        r.addListner((t) => {
          const n = t.filter((t) =>
            "idea" === this.type
              ? t.status === e.idea
              : "active" === this.type
              ? t.status === e.active
              : t.status === e.completed
          );
          (this.assignedTodos = n), this.renderTodos();
        }),
        this.configure(),
        this.renderContent();
    }
    renderTodos() {
      document.getElementById(`${this.type}-Todo-list`).innerHTML = "";
      for (const e of this.assignedTodos) new c(`${this.type}-Todo-list`, e);
    }
    renderContent() {
      const e = `${this.type}-Todo-list`;
      (this.element.querySelector("ul").id = e),
        (this.element.querySelector("h2").textContent = `${this.type} Todos`);
    }
    dragOverHandler(e) {
      var t;
      e.preventDefault(),
        null === (t = this.element) || void 0 === t || t.classList.add("dragg");
    }
    dragDropHandler(t) {
      var n;
      const s = t.dataTransfer.getData("text/plain");
      r.moveTodo(
        s,
        "active" === this.type
          ? e.active
          : "completed" === this.type
          ? e.completed
          : e.idea
      ),
        null === (n = this.element) ||
          void 0 === n ||
          n.classList.remove("dragg");
    }
    dragLeaveHandler(e) {
      var t;
      null === (t = this.element) ||
        void 0 === t ||
        t.classList.remove("dragg");
    }
    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler),
        this.element.addEventListener("drop", this.dragDropHandler),
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
    }
  }
  h([s], u.prototype, "dragOverHandler", null),
    h([s], u.prototype, "dragDropHandler", null),
    h([s], u.prototype, "dragLeaveHandler", null),
    new a(),
    new u("completed"),
    new u("active"),
    new u("idea");
})();

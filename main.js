var STORAGE_KEY = 'todos-vuejs-demo'
//use Storage API to get save the data.
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

new Vue({
  el: '#app',
  data: {
    //使用するデータ
    todos: [],
    current: -1,
    options: [{
        value: -1,
        label: 'all'
      },
      {
        value: 0,
        label: 'concentrating'
      },
      {
        value: 1,
        label: 'done'
      },

    ]
  },
  computed: {
    computedTodos: function() {
      //data current が-1ならすべて
      //それ以外ならcurrent と stateが一致するものだけに絞り込む
      return this.todos.filter(function(el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },
    labels() {
      return this.options.reduce(function(a, b) {
        return Object.assign(a, {
          [b.value]: b.label
        })
      }, {})
      	//keyから見つけやすいように、次のように加工したデータを作成
        //{0:'作業中',1:'完了',-1:'全て'}
    }
  },
  
  watch: {
    //object形式にする
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  created() {
    //instance作成したときに自動fetch()
    //このアプリの「instance作成時」に、localStorageに保存されているdataを自動取得、読み込む。
    this.todos = todoStorage.fetch()
  },
  
  methods: {
    //使用するメソッド
    doAdd: function(event, value) {
      var comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      //(新しいID、コメント、作業状態)
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      //form elementsを空にする
      comment.value = ''
    },


    //change the state
    doChangeState: function(item) {
      item.state = !item.state ? 1 : 0
    },
    //delete
    doRemove: function(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  }
})


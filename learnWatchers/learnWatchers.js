<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
var watchExampleVM = new Vue({
  el : '#watch-example',
  data : {
    question : '',
	answer : 'I couldnot give u an answeer until you ask a question.'
   },
   //watch method‘　：値が変化するたびに呼ばれる、APIに過剰負担
   //負担をかからないように「Lodash」debounce関数を利用 限制操作?率
   //_.debounce(関数、wait時間)　→何秒ごとに動きが止まったら関数を呼ぶ
   
   watch : {
   	//如果'question'?生改?，?个函数就会?行
     question : function(newQuestion,oldQuestion){
    	this.answer = 'Waiting for u to stop typing...'
      
      //監視プロパティを用いた非同期処理 
      this.debouncedGetAnswer()
    }
   },
   created : function(){
   	//AJAX?求指?用??入完?才会?生。
    this.debouncedGetAnswer = _.debounce(this.getAnswer , 500)
   },
   methods : {
   	getAnswer :  function(){
    	if(this.question.indexOf('?') === -1){
      	this.answer = 'Question usually contain a question mark. ;-)'
        return 
      }
      this.answer = 'thinking'
      var vm = this
      
      //axios是用于HTTP通信的javascript library
      //_.capitalize是lodash.js的函数
      axios.get('https://yesno.wtf/api').then(function(response){
       vm.answer = _.capitalize(response.data.answer)
      
      }).catch(function(error){
      	vm.answer = 'Error! Could not reach the API.' + error
      })
    }
   }
})

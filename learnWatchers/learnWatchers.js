//��?AJAX ? �a�ʗp�H��I��?��?����?�x�CVue�j�S��?�v�L�d?
var watchExampleVM = new Vue({

	el : '#watch-example',
  data : {
    question : '',
		answer : 'I couldnot give u an answeer until you ask a question.'
   },
   //watch method�e�@�F�l���ω����邽�тɌĂ΂��AAPI�ɉߏ蕉�S
   //���S��������Ȃ��悤�ɁuLodash�vdebounce�֐��𗘗p ��������?��
   //_.debounce(�֐��Await����)�@�����b���Ƃɓ������~�܂�����֐����Ă�
   
   watch : {
   	//�@��'question'?����?�C?�������A��?�s
    question : function(newQuestion,oldQuestion){
    	this.answer = 'Waiting for u to stop typing...'
      
      //�Ď��v���p�e�B��p�����񓯊�����
      
      this.debouncedGetAnswer()
    }
   },
   created : function(){
   	//AJAX?���w?�p??����?�ˉ�?���B
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
      
      //axios���p��HTTP�ʐM�Ijavascript library
      //_.capitalize��lodash.js�I����
      
      axios.get('https://yesno.wtf/api').then(function(response){
       vm.answer = _.capitalize(response.data.answer)
      
      }).catch(function(error){
      	vm.answer = 'Error! Could not reach the API.' + error
      })
    }
   }
})
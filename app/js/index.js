$(function () {
   $('.todo-footer li').on('click',function () {
       $('.todo-footer li').removeClass('active');
       $(this).addClass('active');
   });

    var rihel=Vue.extend({
        template:'<div>hello</div>'
    });
    Vue.component('rihel',rihel);

    new Vue({
        el:'#app',
        data:{
            addoff:false,
            newItem:'',
            todo_list:local.fetch(),
            transitionName: 'fade'
        },
        component:['rihel'],
        methods:{
            addGo:function () {
                this.addoff=!this.addoff;
            },
            addlist:function () {
                var item={
                    todo_name:this.newItem,
                    todo_startTime:clockon(),
                    todo_state:false,
                    todo_finishTime:''
                };
                this.todo_list.push(item);
                this.newItem='';
                this.addoff=false;
            },
            finish:function (todo) {
                todo.todo_state=true;
                todo.todo_finishTime=clockon();
            },
            reset:function () {
                this.todo_list='';
                local.reset();
            }
        },
        watch:{
           todo_list:{
               handler: function (item) {
                   local.save(item)
               },
               deep: true
           }
        }

    });
});
function clockon() {
    var now = new Date();
    var year = now.getFullYear(); //getFullYear getYear
    var month = now.getMonth();
    var date = now.getDate();
    var day = now.getDay();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var sec = now.getSeconds();
    var week;
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    week = arr_week[day];
    var time = "";
    time = year + "-" + month + "-" + date + "" + " " + hour + ":" + minu + ":" + sec;
    return time;
}

var TODO='todo_task';
var local={
    fetch:function () {
      return JSON.parse(window.localStorage.getItem(TODO)||'[]');
    },
    save:function (item) {
        window.localStorage.setItem(TODO,JSON.stringify(item));
    },
    reset:function () {
        window.localStorage.removeItem(TODO)
    }
};
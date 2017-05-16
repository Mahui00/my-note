var color=['red','blue','green','pink'];
var app = new Vue({
    el:'.el',
    data:{
        notes:[
            {id:1,title:'便签1',content:'',top:10,left:120,them:'red',zindex:0},
            // {id:2,title:'便签2',content:'',top:10,left:420,them:'blue'},
            // {id:3,title:'便签3',content:'',top:320,left:120,them:'green'},
            // {id:4,title:'便签4',content:'',top:320,left:420,them:'pink'},
        ],
        moving:{state:false,index:null,position:{},zindex:0}
    },
    methods:{
        addNote:function (e) {        //在哪双击在哪增加
            var id = this.notes.length ?
                (this.notes[this.notes.length - 1].id + 1) : 1;
            var top=e.clientY-50-18;
            var left=e.clientX-100;
            var title='便签'+id;
            var content='';
            var them=color[Math.floor(Math.random()*color.length)];
            var zindex=0
            // var note={
            //     id:id,
            //     title:'便签'+id,
            //     content:'',
            //     top:top,
            //     left:left,
            //     them:color[them]
            // };
            this.notes.push({id,title,content,top,left,them,zindex});
            this.save();
        },
        md:function (i,e) {   //记录事件源的位置和下标，开关打开
            // alert(1);
            this.moving.state=true;
            this.moving.index=i;
            this.moving.position={
                x:e.offsetX,
                y:e.offsetY
            };
            this.notes[this.moving.index].zindex =this.moving.zindex +=1;
           // this.parentNode.style.zIndex +=1;  //报错
        },
        mv:function (e) { //改变notes里的数据

            if(this.moving.state){
                var top=e.clientY-44-this.moving.position.y;
                var left=e.clientX-this.moving.position.x;
                this.notes[this.moving.index].top=top;
                this.notes[this.moving.index].left=left;
                this.save();
            }
        },
        mu:function () {
            this.moving.state=false;
        },
        save:function (data) {
            localStorage.notes=JSON.stringify(this.notes)
        },
        close:function (i) {
            // console.log(i);
            this.notes.splice(i,1);
            this.save();
        }
    },
    /////////
    mounted:function () {     //data里的数据加载完后执行此函数
        if (localStorage.notes) {
            this.notes = JSON.parse(localStorage.notes);
        }
        //删除便签
        document.onkeyup = (function (e) {
            if (this.moving.index != null && e.keyCode === 8) {
                this.notes.splice(this.moving.index, 1);
                this.moving.index =
                    this.notes.length ?
                        this.notes.length - 1 : null;
                this.save();
            }
        }).bind(this);

    }
})
/////阻止默认事件
// document.body.onclick=function (e) {
//     e.preventDefault()
// }

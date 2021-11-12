<template>
    <div class="transfer-box">
        <!-- 左边 -->
        <transferBoxItem 
            class="transfer-box-left"
            :title="leftTitle"
            v-model="leftData"
            :list="leftList"
            ref="leftBox"
            :listHeight="leftListHeight"
        >
        <template v-slot:other="{item}">
            <slot name="left" :item="item"></slot>
        </template>
        </transferBoxItem>
        <!-- 按钮与右边,可复数 -->
        <div class="transfer-box-center-right" ref="boxCenterRight">
            <div class="transfer-box-center-right-item" v-for="(item,index) in acceptBoxList" :key="index">
                <!-- 按钮 -->
                <div class="center-btn">
                    <div class="to-left btn-item" @click="transferTo('left',index)">
                       <i class="el-icon-arrow-left"></i>
                    </div>
                    <div class="to-right btn-item" @click="transferTo('right',index)">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
                <!-- 右边 -->
                <transferBoxItem 
                    class="transfer-box-right"
                    :title="item.title"
                    v-model="item.data"
                    :list="item.list"
                    :ref="'rightBox' + index"
                >
                <template v-slot:other="{item}">
                    <slot name="right" :item="item"></slot>
                </template>
                </transferBoxItem>
            </div>
        </div>
    </div>
</template>
<script>
import transferBoxItem from "../components/transferBoxItem.vue";
export default {
	name:'muliteTransfer',
    components:{
        transferBoxItem,
    },
    props:{
        leftTitle:{
            type:String,
            default:'左边标题'
        },
        data:{
            type:Array,
            default:()=>[]
        },
        value:{
            type:Object,
            default:()=>{}
        },
        rightBoxList:{
            type:Array,
            default:()=>["右边标题1"]
        }
    },
	data(){
		return {
			acceptBoxList:[],
			leftList:[],
			leftData:[],
			isMounted:false
		}
	},
	model:{
		prop:'value',
		event:'returnBack'
	},
	watch:{
		rightBoxList:{
			deep:true,
			immediate:true,
			async handler(newVal){
				console.log(newVal)
				this.acceptBoxList = newVal.reduce((pre,item,index) => {
				    return [...pre,{title:item,sequence:index,data:[],list:[]}]
				},[]);  
				// 将左边的数据进行过滤，去除右边的数据
				let allCheckedList = await this.getAllCheckedList()
				this.leftList = this.data.filter((val,index)=>{
				    val.sequence = index
				    return !allCheckedList.includes(val.value)
				})
				
			}
		}
	},
	computed:{
		leftListHeight(){
			if(!this.isMounted){
				return
			}
			const boxCenterRight = this.$refs.boxCenterRight
			let rightBoxObjOne = this.$refs.rightBox0
			let header = rightBoxObjOne[0].$refs.header.offsetHeight
			let filter = rightBoxObjOne[0].$refs.filter.offsetHeight
			let centerRight = boxCenterRight.offsetHeight
			let width = centerRight - header - filter
			return width + 'px'
		},
		
	},
	mounted(){
		this.$nextTick(()=>{
			this.isMounted = true
		})
	},
	methods:{
		getAllCheckedList(){
			let list = this.acceptBoxList.map((val)=>{
			    return val.data
			})
			return list.flat()
		},
		// 左右传输
		  transferTo(dire,index){
		        let toListOld = dire == 'right' ? this.acceptBoxList[index].list : this.leftList
		        let fromListOld = dire == 'right' ? this.leftList : this.acceptBoxList[index].list
		        let dataOld = dire == 'left' ? this.acceptBoxList[index].data : this.leftData
		        let filterObj = {toList:toListOld,fromList:fromListOld,data:dataOld}
		        let {toList,fromList} = this.handlerData(filterObj)
		        this.leftList = dire == 'right' ? fromList : toList
		        this.acceptBoxList[index].list = dire == 'left' ? fromList : toList
		        if(dire == 'left'){
		            this.leftData = []
		        }
		        if(dire == 'right'){
		            this.acceptBoxList[index].data = []
		        }
		        // 更新值，change事件
		        let emitData = this.acceptBoxList.reduce((pre,val)=>{
		            pre[val.sequence] = val.list
		            return pre
		        },{})
		        this.$emit('returnBack',emitData)
		        this.change(dire,this.acceptBoxList[index],emitData)
		  },
		  // 操作数据
		  handlerData(obj){
		        let {toList,fromList,data} = obj
		        let filterOut = []
		        let fromListNew = fromList.filter((val)=>{
		            if(data.includes(val.value)){
		                filterOut.push(val)
		            }
		            return !data.includes(val.value)
		        })
		        let toListNew = [...toList,...filterOut]
		        return {toList:toListNew,fromList:fromListNew}
		  },
		//   清理
		clearQuery(dire,index){
		    if(['all','left'].includes(dire)){
				const leftBox = this.$refs.leftBox
		        leftBox.clear()
		    }
		    if(dire == 'right'){
				const rightBox = this.$refs['rightBox' + index]
		        rightBox[0].clear()
		    }
		    if(dire == 'all'){
		        this.acceptBoxList.forEach((val,index2)=>{
					let rightBoxNum = this.$refs['rightBox' + index2]
		            rightBoxNum[0].clear()
		        })
		    }
		},
		change(dire,rightBox,emitData){
		    this.$emit('change',emitData,dire,rightBox)
		}
	},
}
</script>
<style lang='scss' scoped>

.flexBox{
	display:flex
}
@mixin overSpread{
	width:100%;
	height:100%
}
@mixin flexColumn{
	flex-direction: column;
}
@mixin circleDiv{
	border-radius:50%
}
.flexCenter{
	@extend .flexBox;
	align-items: center;
	justify-content: center;
}
.transfer-box{
    @extend .flexBox;
}
.transfer-box-center-right{
	--theme-color: #409EFF;
	--theme-hover-color:#64ACF5;
	--theme-focus-font-color: #fff;
	--theme-font-color: #fff;

    @extend .flexBox;
    @include flexColumn;
    @include overSpread;
    .transfer-box-center-right-item{
        width:20vw;
        margin-bottom:1vh;
        @extend .flexBox;
        &:last-child{
            margin-bottom:0
        }
        .center-btn{
            width:calc( 100% - 13vw);
            @extend .flexCenter;
            @include flexColumn;
            .btn-item{
                --btn-size:5vh;
                width:var(--btn-size);
                height:var(--btn-size);
                @include circleDiv;
                @extend .flexCenter;
                background:var(--theme-color);
                cursor:pointer;
                transition:all .1s linear;
                &:hover{
                    background:var(--theme-hover-color)
                }
                &:first-child{
                    margin-bottom:1vh
                }
                i{
                    color:var(--theme-font-color)
                }
            }
        }
        
    }
}

</style>
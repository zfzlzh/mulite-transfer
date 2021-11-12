<template>
    <div class="transfer-box-item">
        <div class="header" ref="header">
            <el-checkbox 
                :indeterminate="isIndeterminate"
                v-model="checkAll" 
                @change="handleCheckAllChange"
            >
                {{title}}
            </el-checkbox>
            <span class="totalAndActived">
                <span>{{activedNum}}</span>
                <span>/</span>
                <span>{{total}}</span>
            </span>
        </div>
        <div class="filter" ref="filter">
            <el-input 
                v-model="filterData" 
                placeholder="" 
                prefix-icon="el-icon-search"
                clearable
                ref="search"
            >
            </el-input>
        </div>
        <div class="list" :style="listHeight ? 'height:' + listHeight : ''">
            <el-checkbox-group v-model="checkData"  @change="handleChecked" class="check-list" v-if="total > 0">
                <el-checkbox 
                    v-for="item in filterCheckList" 
                    :label="item.value" 
                    :key="item.value" 
                >
                    <slot name="other" :item="item">
                        <span>{{item.label}}</span>
                    </slot>
                </el-checkbox>
            </el-checkbox-group>
            <div class="no-data" v-else>
                暂无数据
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'transferBoxitem',
    props:{
        title:{
            type:String,
            default:''
        },
        value:{
            type:Array,
            default:()=>[]
        },
        list:{
            type:Array,
            default:()=>[]
        },
        listHeight:{
            type:String,
            default:''
        },
    },
	data(){
		return{
			filterData:'',
			checkList:[],
			checkData:[],
			checkAll:false,
			isIndeterminate:true,
		}
	},
    model: {
        prop: 'value',
        event: 'returnBack'
     },
	watch:{
		value:{
			deep:true,
			handler(newVal){
				this.checkData = newVal
			}
		},
		list:{
			deep:true,
			handler(newVal){
				this.checkList = newVal.reduce((pre,item)=>{
				    return [...pre,{...item}]
				},[])
			}
		}
	},
	computed:{
		checkAllData(){
			return this.checkList.map(val => {
			    return val.value
			})
		},
		filterCheckList(){
			this.checkData = []
			let list = ['','null','undefined'].includes(this.filterData + '') ? this.checkList : this.filterList()
			return list.sort((a,b)=> {
			    return a.sequence - b.sequence
			})
		},
		total(){
			return this.filterCheckList.length
		},
		activedNum(){
			this.handleChecked(this.checkData)
			return this.checkData.length
		}
	},
	methods:{
		// 点击全选
		  handleCheckAllChange(val){
		    this.checkData = val && this.checkAllData ? this.checkAllData : [];
		    this.isIndeterminate = false;
		    this.$emit('returnBack',this.checkData)
		  },
		//   点击选项，判断是否全选
		  handleChecked(val){
		      let len = val.length
		      let listLen = this.checkList.length
		      this.checkAll = len == listLen && len + listLen != 0
		      this.isIndeterminate = len > 0 && len < listLen
		      this.$emit('returnBack',val)
		  },
		//   过滤数据
		  filterList(){
		      this.$emit('returnBack',this.checkData)
		      let list = this.checkList.filter(val => {
		          return val.label.toUpperCase().indexOf(this.filterData.toUpperCase()) > -1
		      })
		      return list
		  },
		//   清除
		  clear(){
			  const search = this.$refs.search
		      search.clear()
		  }
	}
}
</script>
<style lang='scss' scoped>
@mixin paddingVer15{
    padding:0 15px
}
@mixin borderBox{
    box-sizing: border-box;
}
@mixin overSpread{
	width:100%;
	height:100%
}
.flexBetCenter{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.no-data{
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#ccc;
    font-size:14px
}
.transfer-box-item{
    --transfer-item-width:13vw;
    --transfer-box-list-height:25vh;
    width: var(--transfer-item-width);
    border:1px solid #ccc;
    border-radius:4px;
    .header{
        height: 5vh;
        @extend .flexBetCenter;
        @include paddingVer15;
        background:#f5f7fa;
        border-bottom:1px solid #ccc;
        width:var(--transfer-item-width);
        @include borderBox;
        .totalAndActived{
            font-size: 1.2vh;
            color: #888;
        }
        :deep(.el-checkbox__input){
            font-size:2vh;
            font-weight: 600;
        }
    }
    .filter{
        padding: 15px;
        height: 7vh;
        width:var(--transfer-item-width);
        @include borderBox;
        :deep(.el-input__inner){
            --transfer-filter-height: 32px;
            border-radius:calc(var(--transfer-filter-height) / 2);
            height:var(--transfer-filter-height)
        }
    }
    .list{
        height: var(--transfer-box-list-height);
        overflow: auto;
        width:var(--transfer-item-width);
        @include paddingVer15;
        @include borderBox;
        .check-list{
            @include overSpread
        }
        .el-checkbox{
            width: 100%;
            margin-right: 0;
            display: inline-flex;
            margin-bottom:1vh;
            align-items: center;
            &:last-child{
                margin-bottom:0
            }
            
        }
        ::v-deep .el-checkbox__label{
                width:89%;
                display: inline-flex;
                justify-content: space-between;
                &>span{
                    display: inline-block;
                    text-align: left;
                }
            }
    }
}
</style>
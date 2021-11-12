<!--
 * @Author: zfz
 * @Date: 2021-11-12 14:16:29
 * @LastEditors: zfz
 * @LastEditTime: 2021-11-12 16:12:24
 * @Description: update
-->
# mulite-transfer
可以有多个接收框的穿梭框，elementui风格

### 参数
|  属性名称|  描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| leftTitle | 左边的标题 | String | '左边的标题' |
| data | 数据源 | Array | [] |
| value | 接收框的数据 | Object | {} |
| rightBoxList | 接收框标题的集合  | Array | ['右边的标题1'] |

### 事件
|  事件名称|  描述  | 参数 |
| --- | --- | --- | --- |
| changeTransfer | 穿梭框左右数据变化时触发 | model---变化后的接收框的值，Object{
                                                                        key--接收框的序号,对应传入的标题的序号:[
                                                                            {
                                                                                "label": "选项0",--选项名称
                                                                                "value": "0",--选项值
                                                                                "sequence": 0--选项序号
                                                                            }
                                                                        ]
                                                                    },
                                            dire---传输方向，left/right,
                                            changeData--- 改变的接收框的数据 |

### 其他
清除输入框方法 refDom.clearQuery(dire,index) -- dire:方向，left/right/all;index:接收框的序号，dire为right时有效
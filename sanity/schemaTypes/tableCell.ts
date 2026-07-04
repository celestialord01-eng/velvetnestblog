import {defineType, defineField} from 'sanity'

export default defineType({

name:'tableCell',

title:'Table Cell',

type:'object',

fields:[

defineField({

name:'content',

title:'Content',

type:'array',

of:[
{
type:'block'
}
]

}),

defineField({

name:'align',

title:'Alignment',

type:'string',

initialValue:'left',

options:{

layout:'radio',

list:[

{title:'Left',value:'left'},

{title:'Center',value:'center'},

{title:'Right',value:'right'}

]

}

})

]

})

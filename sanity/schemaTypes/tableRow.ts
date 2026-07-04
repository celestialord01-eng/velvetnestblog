import {defineType, defineField} from 'sanity'

export default defineType({

  name:'tableRow',

  title:'Table Row',

  type:'object',

  fields:[

    defineField({

      name:'cells',

      title:'Cells',

      type:'array',

      of:[
        {
          type:'tableCell'
        }
      ]

    })

  ]

})

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'table',
  title: 'Table',
  type: 'object',

  fields: [

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string'
    }),

    defineField({
      name: 'hasHeader',
      title: 'Use first row as header',
      type: 'boolean',
      initialValue: true
    }),

    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',

      of: [
        {
          type: 'tableRow'
        }
      ]
    })

  ],

  preview:{
    select:{
      title:'caption'
    },
    prepare({title}){
      return{
        title:title || 'Table'
      }
    }
  }

})

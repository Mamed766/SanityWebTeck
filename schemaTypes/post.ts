import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required().max(100).warning('Title should not exceed 100 characters.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().warning('Main image is required.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Technology', value: 'Technology'},
          {title: 'Marketing', value: 'Marketing'},
          {title: 'Business', value: 'Business'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().warning('Category is required.'),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category',
    },
    prepare(selection) {
      const {title, media, category} = selection
      return {
        title,
        subtitle: category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : 'No category selected',
        media,
      }
    },
  },
})

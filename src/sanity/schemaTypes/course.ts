import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Curso',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Data do Curso',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'workload',
      title: 'Carga Horária',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duração',
      type: 'string',
      description: 'Ex: 3 dias',
    }),
    defineField({
      name: 'description',
      title: 'Descrição do Curso',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'spots',
      title: 'Vagas Disponíveis',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'price',
      title: 'Preço',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'detailsUrl',
      title: 'Link para Detalhes',
      type: 'url',
    }),
    defineField({
      name: 'paymentUrl',
      title: 'Link para Pagamento',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'date',
    },
  },
})

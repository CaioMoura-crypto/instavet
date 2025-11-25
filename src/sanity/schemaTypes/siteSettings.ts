import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    defineField({
      name: 'navbarLogo',
      title: 'Logo da Barra de Navegação',
      type: 'image',
      description: 'Logo que aparece na barra de navegação. Se não definida, usa a logo padrão (/logo.png)',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configurações do Site',
      }
    },
  },
})

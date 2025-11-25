import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'courseLandingPage',
  title: 'Landing Pages',
  type: 'document',
  fieldsets: [
    {
      name: 'basic',
      title: 'Informações Básicas',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'hero',
      title: 'Seção Hero',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'about',
      title: 'Seção Sobre o Curso',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'professor',
      title: 'Seção Sobre o Professor',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'why',
      title: 'Seção Por que Fazer',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'structure',
      title: 'Seção Estrutura',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'location',
      title: 'Seção Localização',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // Informações Básicas
    defineField({
      name: 'course',
      title: 'Curso',
      type: 'reference',
      to: [{ type: 'course' }],
      options: {
        disableNew: true,
      },
      validation: (Rule) => Rule.required(),
      fieldset: 'basic',
    }),
    defineField({
      name: 'isActive',
      title: 'Landing Page Ativa',
      type: 'boolean',
      description: 'Desative para ocultar a landing page',
      initialValue: true,
      fieldset: 'basic',
    }),
    defineField({
      name: 'themeColor',
      title: 'Cor do Tema',
      type: 'string',
      description: 'Escolha a cor principal da landing page',
      options: {
        list: [
          { title: 'Roxo', value: '#9731C2' },
          { title: 'Vermelho', value: '#EC2A2A' },
          { title: 'Azul', value: '#4F32E6' },
          { title: 'Verde', value: '#5AAC47' },
        ],
        layout: 'radio',
      },
      initialValue: '#9731C2',
      validation: (Rule) => Rule.required(),
      fieldset: 'basic',
    }),

    // Seção Hero
    defineField({
      name: 'heroTitle',
      title: 'Título do Hero',
      type: 'string',
      description: 'Editável - por padrão usa o título do curso',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem do Hero',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtítulo do Hero',
      type: 'string',
      description: 'Ex: Cursos de Excelência para profissionais que buscam se destacar na medicina veterinária',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroLogo',
      title: 'Logo do Hero',
      type: 'image',
      description: 'Logo que aparece na faixa gradiente no topo',
      options: { hotspot: true },
      fieldset: 'hero',
    }),

    // Seção Sobre o Curso
    defineField({
      name: 'aboutTitle',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'SOBRE O CURSO',
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'Descrição',
      type: 'text',
      rows: 8,
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutVideo',
      title: 'Vídeo',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Se não tiver vídeo, a imagem será exibida',
      fieldset: 'about',
    }),
    defineField({
      name: 'aboutImage',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
      description: 'Exibida se não houver vídeo',
      fieldset: 'about',
    }),

    // Seção Sobre o Professor
    defineField({
      name: 'professorTitle',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'SOBRE O PROFESSOR',
      fieldset: 'professor',
    }),
    defineField({
      name: 'professorDescription',
      title: 'Descrição do Professor',
      type: 'text',
      rows: 8,
      fieldset: 'professor',
    }),

    // Seção Por que fazer
    defineField({
      name: 'whyTitle',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'POR QUE DEVO FAZER ESSE CURSO?',
      fieldset: 'why',
    }),
    defineField({
      name: 'whyReasons',
      title: 'Motivos',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista de benefícios/motivos',
      fieldset: 'why',
    }),

    // Seção Estrutura
    defineField({
      name: 'structureTitle',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'ESTRUTURA DO INSTAVET',
      fieldset: 'structure',
    }),
    defineField({
      name: 'structureSections',
      title: 'Seções da Estrutura',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Título da Seção', type: 'string' },
          { name: 'items', title: 'Itens', type: 'array', of: [{ type: 'string' }] },
        ],
      }],
      fieldset: 'structure',
    }),
    defineField({
      name: 'structurePhotos',
      title: 'Fotos da Estrutura',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Máximo de 9 fotos para a galeria',
      validation: (Rule) => Rule.max(9),
      fieldset: 'structure',
    }),

    // Seção Localização
    defineField({
      name: 'locationTitle',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'LOCALIZAÇÃO E CONTATOS',
      fieldset: 'location',
    }),
    defineField({
      name: 'locationName',
      title: 'Nome do Local',
      type: 'string',
      fieldset: 'location',
    }),
    defineField({
      name: 'locationAddress',
      title: 'Endereço Completo',
      type: 'text',
      rows: 3,
      fieldset: 'location',
    }),
    defineField({
      name: 'locationWhatsapp',
      title: 'Link WhatsApp',
      type: 'url',
      fieldset: 'location',
    }),
    defineField({
      name: 'locationInstagram',
      title: 'Link Instagram',
      type: 'url',
      fieldset: 'location',
    }),
    defineField({
      name: 'locationMapEmbed',
      title: 'Embed do Google Maps',
      type: 'url',
      fieldset: 'location',
    }),
  ],
  preview: {
    select: {
      courseTitle: 'course.title',
      media: 'heroImage',
      isActive: 'isActive',
    },
    prepare({ courseTitle, media, isActive }) {
      return {
        title: isActive === false ? `🚫 ${courseTitle || 'Sem curso'}` : courseTitle || 'Sem curso',
        subtitle: 'Landing Page',
        media,
      }
    },
  },
})

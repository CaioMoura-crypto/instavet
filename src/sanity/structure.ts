import type {StructureResolver} from 'sanity/structure'

// Estrutura simplificada - pronta para novos schemas quando necessário
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      // Lista vazia - adicione novos documentos aqui quando criar schemas
      ...S.documentTypeListItems()
    ])

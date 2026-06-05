'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { markdownSchema } from "sanity-plugin-markdown"
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'VelvetNest Studio',

  projectId,
  dataset,

  basePath: '/studio',

  schema: {
    types: schemaTypes,
  },

  plugins: [
    structureTool({ structure }),
    markdownSchema(),
   visionTool({
      defaultApiVersion: apiVersion,
    }),
  ],
})

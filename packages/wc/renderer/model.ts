import { createModel } from '@hydrofoil/shaperone-core/store.js'
import type { CSSResult, CSSResultArray } from 'lit'
import { css } from 'lit'
import deepmerge from 'concat-merge'
import type { RecursivePartial } from '@hydrofoil/shaperone-core/lib/RecursivePartial.js'
import type { RenderTemplates } from '../templates.js'
import { templates } from '../templates.js'
import type { State } from '../store.js'

export interface RendererState {
  templates: RenderTemplates
  styles: CSSResult | CSSResultArray
  ready?: boolean
}

function styleReducer(reduced: CSSResultArray, styles: CSSResult | CSSResultArray | undefined): CSSResultArray {
  if (!styles) return reduced

  if (Array.isArray(styles)) {
    return [...reduced, ...styles]
  }

  return [...reduced, styles]
}

function combineStyles(strategy: RenderTemplates) {
  return Object.values(strategy)
    .map(strat => strat.styles)
    .reduce(styleReducer, [css``])
}

export const renderer = createModel({
  state: <RendererState>{
    templates,
    styles: combineStyles(templates),
  },
  reducers: {
    ready(state): RendererState {
      return {
        ...state,
        ready: true,
      }
    },
    setTemplates(state, newTemplates: RecursivePartial<RenderTemplates>): RendererState {
      const templates = deepmerge(state.templates, newTemplates)

      return {
        ...state,
        templates,
        ready: false,
        styles: combineStyles(templates),
      }
    },
  },
  effects: (store) => {
    const dispatch = store.getDispatch()

    return {
      async loadDependencies() {
        const state: State = store.getState()

        await Promise.all(
          Object.values(state.renderer.templates)
            .reduce<Promise<unknown>[]>((promises, strat) => {
            if (!strat.loadDependencies) {
              return promises
            }

            return [...promises, ...strat.loadDependencies()]
          }, []),
        )

        dispatch.renderer.ready()
      },
    }
  },
})

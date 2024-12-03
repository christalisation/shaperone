import { dash } from '@tpluscode/rdf-ns-builders'
import type { ComponentInstance, SingleEditorComponent } from '../../models/components/index.js'
import type { CoreComponent } from '../components.js'

/**
 * Instance state of text area with lang component
 */
export interface TextAreaWithLang extends ComponentInstance {
}

export interface TextAreaWithLangEditor extends SingleEditorComponent<TextAreaWithLang> {
}

/**
 * Extend to implement [DASH text area with lang editor](http://datashapes.org/forms.html#TextAreaWithLangEditor)
 */
export const textAreaWithLang: CoreComponent<TextAreaWithLangEditor> = {
  editor: dash.TextAreaWithLangEditor,
}

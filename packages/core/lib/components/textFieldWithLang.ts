import { dash } from '@tpluscode/rdf-ns-builders'
import type { ComponentInstance, SingleEditorComponent } from '../../models/components/index.js'
import type { CoreComponent } from '../components.js'

/**
 * Instance state of text field with lang component
 */
export interface TextFieldWithLang extends ComponentInstance {
}

export interface TextFieldWithLangEditor extends SingleEditorComponent<TextFieldWithLang> {
}

/**
 * Extend to implement [DASH text field editor](http://datashapes.org/forms.html#TextFieldWithLangEditor)
 */
export const textFieldWithLang: CoreComponent<TextFieldWithLangEditor> = {
  editor: dash.TextFieldWithLangEditor,
}

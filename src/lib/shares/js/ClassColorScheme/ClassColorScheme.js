import CommonStore from '$lib/stores/Common'
import {EnumColorScheme} from "./enums"

const sessionDataKey = 'colorScheme'
export const ColorScheme = EnumColorScheme
export const {colorScheme} = CommonStore

export class ClassColorScheme {
    #sessionPara
    #isSupport
    #valScheme
    #matcher

    constructor() {
        this.#sessionPara = window.sessionStorage.getItem(sessionDataKey)
        this.#isSupport = typeof window.matchMedia !== 'undefined'
        this.#valScheme = undefined
        this.#matcher = window.matchMedia('(prefers-color-scheme: dark)')
        if (this.#isSupport) {
            if (!this.#sessionPara) {
                this.#update(this.#matcher.matches)
            } else {
                this.#update(this.#sessionPara === ColorScheme.DARK.description)
            }
        }
    }

    #update(bool) {
        this.#valScheme = (bool ? ColorScheme.DARK : ColorScheme.LIGHT).description
        window.document.querySelector('html').dataset.colorScheme = this.#valScheme
        colorScheme.set(this.#valScheme)
    }

    watch() {
        if (!this.#isSupport) return
        this.#matcher.addEventListener('change', event => {
            if (!this.#sessionPara) {
                this.#update(event.matches)
            }
        })
    }

    get() {
        return this.#valScheme
    }

    switch() {
        this.#update(this.#valScheme !== ColorScheme.DARK.description)
        window.sessionStorage.setItem(sessionDataKey, this.#valScheme)
    }
}

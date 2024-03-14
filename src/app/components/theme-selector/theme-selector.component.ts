import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'theme-selector',
  template: `
    <div class="hs-dropdown" data-hs-dropdown-placement="bottom-right" data-hs-dropdown-offset="30">
      <button type="button" class="hs-dropdown-toggle hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500">
        <svg class="hs-dark-mode-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        <svg class="hs-dark-mode-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 8a2 2 0 1 0 4 4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      </button>

      <div id="selectThemeDropdown" class="hs-dropdown-menu hs-dropdown-open:opacity-100 mt-2 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mb-2 origin-bottom-left bg-white shadow-md rounded-lg p-2 space-y-1 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700">
        <button type="button" class="hs-auto-mode-active:bg-gray-100 w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" data-hs-theme-click-value="auto">
          Auto (system default)
        </button>
        <button type="button" class="hs-default-mode-active:bg-gray-100 w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" data-hs-theme-click-value="default">
          Default (light mode)
        </button>
        <button type="button" class="hs-dark-mode-active:bg-gray-700 w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" data-hs-theme-click-value="dark">
          Dark
        </button>
      </div>
    </div>
  `,
  styles: ``
})
export class ThemeSelectorComponent implements OnInit {
  
  ngOnInit(): void {
    this.HSThemeAppearance.init()

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (this.HSThemeAppearance.getOriginalAppearance() === 'auto') {
            this.HSThemeAppearance.setAppearance('auto', false)
        }
    })
  
    window.addEventListener('load', () => {
        const $clickableThemes = document.querySelectorAll('[data-hs-theme-click-value]')
        const $switchableThemes = document.querySelectorAll('[data-hs-theme-switch]')
  
        $clickableThemes.forEach(($item: any) => {
            $item.addEventListener('click', () => this.HSThemeAppearance.setAppearance($item.getAttribute('data-hs-theme-click-value'), true, $item))
        })
  
        $switchableThemes.forEach(($item: any) => {
            $item.addEventListener('change', (e: any) => {
                this.HSThemeAppearance.setAppearance(e.target.checked ? 'dark' : 'default')
            })
  
            $item.checked = this.HSThemeAppearance.getAppearance() === 'dark'
        })
  
        window.addEventListener('on-hs-appearance-change', (e: any) => {
            $switchableThemes.forEach(($item: any) => {
                $item.checked = e.detail === 'dark'
            })
        })
    })
  }

  HSThemeAppearance = {
    init() {
        const defaultTheme = 'default'
        let theme = localStorage.getItem('hs_theme') || defaultTheme

        if (document.querySelector('html')?.classList.contains('dark')) return
        this.setAppearance(theme)
    },

    _resetStylesOnLoad() {
        const $resetStyles = document.createElement('style')
        $resetStyles.innerText = `*{transition: unset !important;}`
        $resetStyles.setAttribute('data-hs-appearance-onload-styles', '')
        document.head.appendChild($resetStyles)
        return $resetStyles
    },

    setAppearance(theme: any, saveInStore = true, dispatchEvent = true) {
        const $resetStylesEl = this._resetStylesOnLoad()

        if (saveInStore) {
            localStorage.setItem('hs_theme', theme)
        }

        if (theme === 'auto') {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
        }

        document.querySelector('html')?.classList.remove('dark')
        document.querySelector('html')?.classList.remove('default')
        document.querySelector('html')?.classList.remove('auto')

        document.querySelector('html')?.classList.add(this.getOriginalAppearance())

        setTimeout(() => {
            $resetStylesEl.remove()
        })

        if (dispatchEvent) {
            window.dispatchEvent(new CustomEvent('on-hs-appearance-change', {detail: theme}))
        }
    },
    
    getAppearance() {
        let theme = this.getOriginalAppearance()
        if (theme === 'auto') {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
        }
        return theme
    },

    getOriginalAppearance() {
        const defaultTheme = 'default'
        return localStorage.getItem('hs_theme') || defaultTheme
    }
  }

}

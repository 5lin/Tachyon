export const translations = {
    en: {
        // App
        appName: 'Tachyon',
        appTagline: 'Lightning-fast Comic Reader',

        // Home page
        searchPlaceholder: 'Search comics...',
        sortByName: 'By Name',
        sortByPagesAsc: 'Pages ↑',
        sortByPagesDesc: 'Pages ↓',
        comicsCount: '{count} comics',
        noComics: 'No Comics',
        noComicsHint: 'Set the COMICS_DIR environment variable to point to your comics directory',
        noResults: 'No Results',
        noResultsHint: 'Try different keywords',
        foundComics: 'Found {count} comics',
        loadFailed: 'Load Failed',
        reload: 'Reload',
        pages: '{count} pages',

        // Reader
        back: 'Back',
        thumbnails: 'Thumbnails',
        zoom: 'Zoom',
        reset: 'Reset',
        settings: 'Settings',
        preloadPages: 'Preload Pages',
        preloadHint: 'More pages preloaded means smoother reading but more data usage',

        // Auth
        login: 'Login',
        logout: 'Logout',
        profile: 'Profile',

        // Common
        loading: 'Loading...',
        error: 'Error',
        gridView: 'Grid View',
        listView: 'List View',

        // Settings Categories
        general: 'General',
        reader: 'Reader',
        about: 'About',
        appearance: 'Appearance',
        language: 'Language',
        theme: 'Theme',
        system: 'System',
        light: 'Light',
        dark: 'Dark',
        version: 'Version',
    },
    zh: {
        // App
        appName: 'Tachyon',
        appTagline: '超光速漫画阅读器',

        // Home page
        searchPlaceholder: '搜索漫画...',
        sortByName: '按名称',
        sortByPagesAsc: '页数 ↑',
        sortByPagesDesc: '页数 ↓',
        comicsCount: '{count} 部',
        noComics: '暂无漫画',
        noComicsHint: '请设置 COMICS_DIR 环境变量指向漫画目录',
        noResults: '未找到结果',
        noResultsHint: '尝试其他关键词',
        foundComics: '找到 {count} 部漫画',
        loadFailed: '加载失败',
        reload: '重新加载',
        pages: '{count} 页',

        // Reader
        back: '返回',
        thumbnails: '缩略图',
        zoom: '缩放',
        reset: '重置',
        settings: '设置',
        preloadPages: '预加载页数',
        preloadHint: '预加载更多页面可提供更流畅的阅读体验，但会消耗更多流量',

        // Auth
        login: '登录',
        logout: '退出登录',
        profile: '个人资料',

        // Common
        loading: '加载中...',
        error: '错误',
        gridView: '网格视图',
        listView: '列表视图',

        // Settings Categories
        general: '常规',
        reader: '阅读器',
        about: '关于',
        appearance: '外观',
        language: '语言',
        theme: '主题',
        system: '跟随系统',
        light: '浅色',
        dark: '深色',
        version: '版本',
    }
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en

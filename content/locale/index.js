import { ru } from './ru'
import { en } from './en'
import { tr } from './tr'

const langs = {
  ru,
  en,
  tr,
}

export default function useLang(router) {
  const { locale, defaultLocale, pathname } = router
  const localeCopy = langs[locale]

  return { messages: localeCopy[pathname] || '', locale, defaultLocale }
}

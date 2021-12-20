import HeadHTML from '../components/layout/HeadHTML'
import '../styles/globals.css'
import App from 'next/app'
import { IntlProvider } from 'react-intl'
import useLang from '../content/locale'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { messages, locale, defaultLocale } = useLang(router)

  return (
    <>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <HeadHTML />
        <Component {...pageProps} />
      </IntlProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  if (appContext.ctx?.req?.headers['accept-language']) {
    const locales = appContext.router.locales
    const locale = appContext.router.locale

    if (locales.includes(locale) && locale !== 'default') return { ...appProps }
    if (appContext.ctx.res) {
      const regex = /([^-;]*)(?:-([^;]*))?(?:;q=([0-9]\.[0-9]))?/
      const accept_languages =
        appContext.ctx.req.headers['accept-language'].match(regex)
      const accept_language =
        locales.find((l) => accept_languages.includes(l)) || 'en'

      const path = appContext.router.asPath.split('/')
      path.splice(1, 1)
      appContext.ctx.res.writeHead(307, {
        Location: `/${accept_language}/${path.join('')}`,
      })
      appContext.ctx.res.end()
    }
  }
  return { ...appProps }
}

export default MyApp

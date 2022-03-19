import HeadHTML from '../components/layout/HeadHTML'
import '../styles/globals.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'highcharts/css/stocktools/gui.css'
import 'highcharts/css/annotations/popup.css'
import './widget.js'

import App from 'next/app'
import { IntlProvider } from 'react-intl'
import useLang from '../content/locale'
import { useRouter } from 'next/router'

import { useEffect } from "react";
import {initiateSocketConnection,disconnectSocket} from '../pages/socketio';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    initiateSocketConnection();
    return () => {
      disconnectSocket();
    }
  }, []);
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

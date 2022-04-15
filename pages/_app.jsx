import HeadHTML from '../components/layout/HeadHTML'
import '../styles/globals.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'highcharts/css/stocktools/gui.css'
import 'highcharts/css/annotations/popup.css'

import App from 'next/app'
import { IntlProvider } from 'react-intl'
import useLang from '../content/locale'
import { useRouter } from 'next/router'

import { useEffect } from "react";
import {initiateSocketConnection,disconnectSocket} from './socketio';
import 'antd/dist/antd.css';
import { CookiesProvider } from "react-cookie"
import cookie from "cookie"
import { Context } from 'react-intl/src/components/injectIntl';

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
        <CookiesProvider>
        <Component {...pageProps} />
        </CookiesProvider>
      </IntlProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  // console.log(appContext)
  if (appContext.ctx?.req?.headers['accept-language']) {
    const locales = appContext.router.locales
    const locale = appContext.router.locale
    console.log(appContext.router)
  const data=appContext.ctx.req.headers.cookie
  console.log(data)
  const loginfo=(data)=> {
      return cookie.parse(data || "")
    }
    console.log(loginfo(data).user)
  const loged=!!loginfo(data).user?JSON.parse(loginfo(data).user).auth:false
  console.log(loged)
  console.log(appContext.ctx.asPath)
    if (!loged && appContext.ctx.asPath !== "/finam" && appContext.ctx.asPath !== "/") {
      //
      console.log("redirect")
      appContext.ctx.res.writeHead(301, { Location: '/finam' }).end()
      return { ...appProps };
    }
    if (locales.includes(locale) && locale !== 'default')
    { 
      console.log("here")
      console.log(appContext.ctx.asPath)
      return { ...appProps }
  }
    if (appContext.ctx.res) {
      const regex = /([^-;]*)(?:-([^;]*))?(?:;q=([0-9]\.[0-9]))?/
      console.log(regex)
      const accept_languages =appContext.ctx.req.headers['accept-language'].match(regex)
      console.log(accept_languages)
      const accept_language =locales.find((l) => accept_languages.includes(l)) || 'en'
      const path = appContext.router.asPath.split('/')
      console.log(path)
      console.log(path.join(''))
      path.splice(1, 1)
      // console.log(path.join(''))
        appContext.ctx.res.writeHead(307, {
        Location: `/${accept_language}/${path.join('')}`,
      })
      
      appContext.ctx.res.end()
    }
  }
  return { ...appProps }
}

export default MyApp


import '../../styles/globals.css'
// import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'

import { Provider as AuthProvider } from 'next-auth/client'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../app/store'
import { Header } from '../../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (


    <AuthProvider session={pageProps.session}>
      <ReduxProvider store={store}>
      <Header />
        <Component {...pageProps} />
      </ReduxProvider>
    </AuthProvider>

  )
}

export default MyApp

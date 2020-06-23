import React from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';

function App(props: any) {
    // const store = useStore(pageProps.initialReduxState)
    const { Component, pageProps } = props
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Walmart</title>
                {/* <meta name="theme-color" content={this.props.theme.palette.primary.main} /> */}

                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <CssBaseline />
            <Component {...pageProps} />
        </>
    )
}

App.getInitialProps = async ({ Component, ctx }:any) => {

    return {
        pageProps: {
            // Call page-level getInitialProps
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        },
    };

};
export default App
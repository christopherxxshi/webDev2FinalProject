import React, { Component } from 'react';
import Layout from "../components/Layout";
// import { Provider } from "react-redux";
// import store from "../store";
// import Head from 'next/head';
// import Link from "next/link";
// import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import DisplayPosts from "./DisplayPosts";
// import createBrowserHistory from "history";

class App extends Component {
    render() {
        return (
            <div>
                {/* <Head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    ></link>
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                </Head> */}
            
            {/* <Provider store={store}> */}
                <Layout>
                    
                </Layout>
               
               
                        <DisplayPosts></DisplayPosts>
              
            {/* </Provider> */}
            </div>
        );
    }
}

export default App;
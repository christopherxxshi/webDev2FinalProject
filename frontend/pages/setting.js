import React from "react";
import { withRouter } from 'next/router';
import Layout from "../components/Layout";

class Setting extends React.Component {


    render() {
        return (
            <Layout>
                <div>
                    Hi from setting page.
        </div>
            </Layout>

        )
    }

}

export default withRouter(Setting);
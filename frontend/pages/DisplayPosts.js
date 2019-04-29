import React from "react";
import { withRouter } from 'next/router';
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";

class DisplayPosts extends React.Component {


    render() {
        return (
           
            // <Layout>
            <div>
            
                 <SideBar></SideBar>
                
        </div>
            // </Layout>

        )
    }

}

export default withRouter(DisplayPosts);
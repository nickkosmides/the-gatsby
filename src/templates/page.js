import React from "react";
import { BlockRendererProvider  } from "@webdeveducation/wp-block-tools";
import { BlockRendererComponents } from "../config/blockRendererComponents";
import { Link } from "gatsby";
import { Layout } from '../components'
import  {graphql} from 'gatsby';
const page = (props) => {
  console.log("Page Props",props);
  return (
    <Layout>
    <div>
  <BlockRendererProvider allBlocks={props.pageContext.blocks} 
  renderComponent={BlockRendererComponents}
  siteDomain={process.env.GATSBY_WP_URL}
  customInternalLinkComponent={({children, internalHref, className}, index) => {
    
    return <Link key={index} to={internalHref} className={className}>{children}</Link>;
  }}
  />
  </div>
  </Layout>
  )
}

export const query = graphql`
query PageQuery($databaseId: Int!) {
  wpPage(databaseId: {eq: $databaseId}) {
    seo {
      metaDesc
      title
    }
  }
  wpCar(databaseId: {eq: $databaseId}) {
    seo {
      metaDesc
      title
    }
  }
}
`;

export const Head = ({data}) => {
  const page = data.wpPage || data.wpCar;
  return (
    <>
    <title>
      {page.seo?.title || ""}
    </title>
    <meta name="description" content={page.seo?.metaDesc || ""}></meta>
    </>
  )
}

export default page;
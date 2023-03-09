import React from "react";
import { BlockRenderer,getStyles, getClasses } from "@webdeveducation/wp-block-tools";

import { CallToActionButton, MediaText } from "../components/index";
import { GatsbyImage } from "gatsby-plugin-image";
import { Cover } from "../components/index";
import { TickItem, CarSearch, ContactForm7 } from "../components/index";

import numeral from "numeral";
export const BlockRendererComponents = (block) => {
  console.log("render component: ", block);
 
  switch(block.name){
    case "contact-form-7/contact-form-selector":
      return <ContactForm7 key={block.id}
      formId={block.attributes.id}
      formMarkup={block.attributes.formMarkup.replace('novalidate="novalidate"', "").split('aria-required="true"').join('aria-required="true" required')}

      />
    case "tgg/carsearch":{
      return <CarSearch key={block.id} 
      style={getStyles(block)}
      className={getClasses(block)}/>
    }
    case "tgg/carprice": {
      return <div className="flex justify-center">
        <div className="bg-black text-3xl text-white py-5 px-8 font-heading">{numeral(block.attributes.price).format("0,0")}€</div>
      </div>
    }
    case "tgg/tickitem": {
      return <TickItem key={block.id}>
         <BlockRenderer blocks={block.innerBlocks}/>
      </TickItem>
    }
    case "core/cover": {
      return <Cover key={block.id} style={getStyles(block)}
      className={getClasses(block)}
      gatsbyImage={block.attributes.gatsbyImage}>
      <BlockRenderer blocks={block.innerBlocks}/>
      </Cover>
    }
    case "core/image": {
      console.log("IMAGE BLOCK", block);
      return (
        <figure key={block.id} className={getClasses(block)}>
          <GatsbyImage 
          style={getStyles(block)}
          image={block.attributes.gatsbyImage}
          alt={block.attributes.alt || ""}
          width={block.attributes.width}
          height={block.attributes.height}
          />
        </figure>
      )
    }
    case "tgg/ctabutton": {
      console.log('CTA BUTTON DATA: ', block);
      const alignMap = {
        'left': "text-left",
        "center": "text-center",
        "right": "text-right"
      }
      return <div key={block.id} className={alignMap[block.attributes.data.align]}>
        <CallToActionButton destination={block.attributes.data.destination} label={block.attributes.data.label}/>
      </div>;
    }
    case "core/media-text": {
      console.log("render component2: ", block.attributes.verticalAlignment);
      return (<MediaText key={block.id} className={getClasses(block)} style={getStyles(block)}
      verticalAlignment={block.attributes.verticalAlignment}
      gatsbyImage={block.attributes.gatsbyImage}
      mediaPosition={block.attributes.mediaPosition}
      >
        <BlockRenderer blocks={block.innerBlocks}/>
      </MediaText>
      );
    }
    default:
      return null
  }
}
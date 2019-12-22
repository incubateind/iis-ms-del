import React, { Component } from 'react';
import './About.css';

/**
 * Class to handle the rendering of the Home page.
 * @extends React.Component
 */
export default class Home extends Component {
  render() {
    return (
      <div className="About container">
        <h1>About</h1>
        <p>
          Type of Skin Cancer:
          <br></br>
         Actinic keratoses and intraepithelial carcinoma (akiec): common non-invasive variants of squamous cell carcinomas. They are sometimes seen as precursors that may progress to invasive squamous cell carcinoma.
          <br></br>
          Basal cell carcinoma (bcc): a common version of epithelial skin cancer that rarely metastasizes but grows if it isn’t treated.
          <br></br>
          Benign keratosis (bkl): contains three subgroups (seborrheic keratoses, solar lentigo, and lichen-planus like keratoses (LPLK)). These groups may look different but are biologically similar.
          <br></br>
          Dermatofibroma (df): a benign skin lesion that is regarded as a benign proliferation or an inflammatory reaction to minimal trauma.
          <br></br>
          Melanoma (mel): a malignant neoplasm that can appear in different variants. Melanomas are usually, but not always, chaotic, and some criteria depend on the site location.
          <br></br>
          Melanocytic Nevi (nv): these variants can differ significantly from a dermatoscopic point of view but are usually symmetric in terms of distribution of color and structure.
          <br></br>
          Vascular Lesions (vasc): generally categorized by a red or purple color and solid, well-circumscribed structures known as red clods or lacunes.
        </p>
      </div>
    );
  }
}

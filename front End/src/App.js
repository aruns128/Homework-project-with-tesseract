import * as React from "react";
import "./App.css";
import Tesseract from "tesseract.js";

import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
// const handwritten = require("handwritten.js");
import { output } from "./service.js";

class App extends React.Component {
  state = {
    data: "",
    loading: false,
    data1: ""
  };
  componentDidMount() {}

  handleChange = async info => {
    console.log("infooooooo", info);

    let state;

    this.setState({ loading: true });

    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
      
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log("sivasakthi");
      console.log("info", info);
      await Tesseract.recognize(info.file.originFileObj, "eng", {
        logger: m => console.log(m)
      })
        .then(async ({ data: { text } }) => {
          state = text;
          console.log(text);
          await output(text)

          //  converted.pipe(fs.createWriteStream("output1"));
        })
        .catch(err => {
          console.log("err", err);
        });
      this.setState({ data: state, loading: false });
    } else if (info.file.status === "error") {
      await Tesseract.recognize(info.file.originFileObj, "eng", {
        logger: m => console.log(m)
      })
        .then(async ({ data: { text } }) => {
          state = text;
          console.log(text);
          await output(text)

          //  converted.pipe(fs.createWriteStream("output1"));
        })
        .catch(err => {
          console.log("err", err);
        });
      this.setState({ data: state, loading: false });
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  onDocumentLoadSuccess = ({ numPages }) => {
    // setNumPages(numPages);
  };
  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div className="App" style={{ paddingTop: "12px" }}>
      <h1>Hand Written Project</h1>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          // beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
        {/* ,<button onClick={this.upload}>click to upload</button> */}
       
        <div>{this.state.data}</div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";

class Body extends Component {
  render() {
    return (
      <div
        className="flex flex-col items-start justify-start flex-1 overflow-y-auto p-1"
        style={{ boxShadow: "inset 1px 1px 12px #86dc8a33" }}
      >
        <div className="min-h-full min-w-full max-w-full">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Body;

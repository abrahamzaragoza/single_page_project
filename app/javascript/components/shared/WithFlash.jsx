import React from "react";

const withFlash = (Component) => {
  return class WithFlash extends React.Component {
    state = {
      toShow: true,
    };

    componentDidMount = () => {
      if (this.state.toShow) {
        setTimeout(() => {
          this.setState({ toShow: false });
        }, 2000);
      }
    };

    render() {
      return <>{this.state.toShow && <Component {...this.props} />}</>;
    }
  };
};

export default withFlash;

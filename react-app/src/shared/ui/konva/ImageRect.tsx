import * as React from 'react';
import * as ReactKonva from 'react-konva';
import { ImageConfig } from 'konva';

interface State {
  image?: HTMLImageElement;
}

interface Props extends Partial<ImageConfig> {}

export class YodaImage extends React.Component<Props, State> {
  state: State = {
    image: undefined
  };
  componentDidMount() {
    const image = new Image();
    image.src = 'http://konvajs.github.io/assets/yoda.jpg';
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  render() {
    return this.state.image ? (
      <ReactKonva.Rect
        {...this.props}
        fillPatternImage={this.state.image}
        fillPatternRepeat="no-repeat"
        draggable={true}
      />
    ) : (
      <ReactKonva.Rect {...this.props} />
    );
  }
}

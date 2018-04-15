import * as React from 'react';
import * as ReactKonva from 'react-konva';
import { ImageConfig } from 'konva';
import { CropData } from '@wwc/core';

interface State {
  image?: HTMLImageElement;
}

interface Props extends Partial<ImageConfig>, ReactKonva.KonvaNodeProps {
  href: string;
  cropData?: CropData;
  ratio: number;
}

export class ImageRect extends React.Component<Props, State> {
  state: State = {
    image: undefined
  };
  componentDidMount() {
    this.loadImage(this.props.href);
  }

  componentWillReceiveProps(props: Props) {
    if (this.state.image && this.state.image!.src !== props.href) {
      this.loadImage(props.href);
    }
  }

  loadImage(href: string) {
    const image = new Image();
    image.src = href;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  render() {
    return this.state.image ? (
      <ReactKonva.Image
        {...this.props}
        image={this.state.image}
        crop={
          this.props.cropData && {
            x: this.props.cropData!.x,
            y: this.props.cropData!.y,
            width: this.props.cropData!.width,
            height: this.props.cropData!.height
          }
        }
        height={this.calculateHeight()}
      />
    ) : (
      <ReactKonva.Rect {...this.props} />
    );
  }

  calculateHeight(): number {
    return this.props.width! / this.props.ratio;
  }
}

import * as React from 'react';
import * as ReactKonva from 'react-konva';
import { ImageConfig } from 'konva';
import { mathHelper, CropData } from '@wwc/core';

interface State {
  image?: HTMLImageElement;
}

interface Props extends Partial<ImageConfig>, ReactKonva.KonvaNodeProps {
  href: string;
  crop?: CropData;
}

export class ImageRect extends React.Component<Props, State> {
  state: State = {
    image: undefined
  };
  componentDidMount() {
    const image = new Image();
    image.src = this.props.href;
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
        height={this.props.crop ? this.props.crop.height : this.calculateHeight()}
        image={this.state.image}
        crop={this.props.crop}
      />
    ) : (
      <ReactKonva.Rect {...this.props} />
    );
  }

  calculateHeight(): number {
    return mathHelper.calculateHeight({
      originalWidth: this.state.image!.width,
      originalHeight: this.state.image!.height,
      width: this.props.width!
    });
  }
}

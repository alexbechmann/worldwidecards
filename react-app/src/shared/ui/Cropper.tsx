import * as React from 'react';
import { Ref } from 'react';
import Measure, { BoundingRect } from 'react-measure';
import { mathHelper, CropData, ImageData } from '@wwc/core';
import { CircularProgress } from 'material-ui';

const ReactImageCropper: React.ComponentType<{
  src: string;
  ref?: (ref: Ref<any>) => void;
  onChange?: (values: any) => any;
  onImgLoad?: () => any;
  originX?: number;
  originY?: number;
  width?: number;
  height?: number;
  ratio?: number;
}> = require('react-image-cropper').Cropper;

interface State {
  bounds: Partial<BoundingRect>;
  boundsToImgRatio: number;
  imgLoaded: string;
  imgCropperLoaded: boolean;
  loadingImage: boolean;
  loadingImageError?: string;
}

interface Props {
  onCropChange: (crop: CropData) => any;
  imageData: ImageData;
  onImageLoadStateChange?: (loading: boolean) => any;
}

export class Cropper extends React.Component<Props, State> {
  cropper: any;
  img: HTMLImageElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      bounds: {
        width: -1,
        height: -1
      },
      boundsToImgRatio: 1,
      imgLoaded: '',
      imgCropperLoaded: false,
      loadingImage: false
    };
  }

  render() {
    return this.state.imgLoaded === this.props.imageData.href ? (
      <Measure
        bounds={true}
        onResize={contentRect => {
          var ratio = 1;
          if (this.props.imageData && this.props.imageData.crop) {
            ratio = mathHelper.getRatio(this.props.imageData.crop!.imgWidth, contentRect.bounds!.width!);
          }
          this.setState({ bounds: contentRect.bounds!, boundsToImgRatio: ratio });
        }}
      >
        {({ measureRef }) => {
          const { crop, ratio } = this.props.imageData;
          return (
            <div ref={measureRef}>
              <ReactImageCropper
                src={`${this.props.imageData.href}`}
                ref={ref => {
                  this.cropper = ref;
                }}
                onImgLoad={() => {
                  if (!this.props.imageData.crop) {
                    const { imgWidth, imgHeight } = this.cropper.values().original;
                    var ratioNumber = ratio.height / ratio.width;
                    this.props.onCropChange({
                      x: 0,
                      y: 0,
                      width: 300,
                      height: 300 * ratioNumber,
                      imgHeight,
                      imgWidth
                    });
                    this.workAroundToForceRerenderAndFixIncorrectCrop();
                  }
                }}
                onChange={values => {
                  this.props.onCropChange(values.original);
                }}
                originX={crop ? crop.x * this.state.boundsToImgRatio : undefined}
                originY={crop ? crop.y * this.state.boundsToImgRatio : undefined}
                width={crop ? crop.width * this.state.boundsToImgRatio : undefined}
                height={crop ? crop.height * this.state.boundsToImgRatio : undefined}
                ratio={ratio.width / ratio.height}
              />
            </div>
          );
        }}
      </Measure>
    ) : this.state.loadingImageError ? (
      <p>{this.state.loadingImageError}</p>
    ) : (
      <CircularProgress />
    );
  }

  componentWillReceiveProps(props: Props) {
    this.loadImageIfNecessary(props);
  }

  componentDidMount() {
    this.loadImageIfNecessary(this.props);
  }

  workAroundToForceRerenderAndFixIncorrectCrop() {
    const i = this.state.imgLoaded;
    this.setState(
      {
        imgLoaded: '',
        imgCropperLoaded: false
      },
      () => {
        this.setState({
          imgLoaded: i,
          imgCropperLoaded: true
        });
      }
    );
  }

  loadImageIfNecessary(props: Props) {
    if (this.state.imgLoaded !== props.imageData.href) {
      this.img = new Image();
      this.img.src = props.imageData.href;
      this.setState({
        loadingImage: true,
        loadingImageError: undefined
      });
      this.img.onerror = () => {
        this.setState({
          loadingImage: false,
          loadingImageError: 'Image load failed'
        });
      };
      this.img.onload = () => {
        this.setState({
          imgLoaded: this.img.src,
          loadingImage: false,
          loadingImageError: undefined
        });
      };
    }
  }
}

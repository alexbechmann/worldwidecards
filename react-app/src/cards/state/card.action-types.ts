import { ShapePosition } from '../shapes/shape-position';
import { Shape, Page } from '@wwc/core';

export type AddTextShapeArgs = { pageIndex: number; text?: string };
export type AddTextShapePayload = { pageIndex: number; textShape: Shape };

export type UpdateShapeWidthArgs = { position: ShapePosition; newWidth: number; shape: Shape; page: Page };
export type UpdateShapeWidthPayload = { position: ShapePosition; newWidth: number };

export type UpdateTextArgs = { pageIndex: number; shapeIndex: number; text: string };

export type UpdateShapePositionArgs = { pageIndex: number; shapeIndex: number; x: number; y: number };

export type RemoveShapeArgs = { position: ShapePosition };


import { Renderer } from '@r-t-p/renderer';
import { ParticleFactory } from "./index"
import 'jest-canvas-mock';

describe('factory', () => {
  it("should exist", () => {
    let canvas:HTMLCanvasElement = document.createElement('canvas');
    let r = new Renderer(canvas);
    let factory = new ParticleFactory(r);
    expect(factory).not.toBeNull();
  })
});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticleFactory = void 0;
const renderer_1 = require("@r-t-p/renderer");
const utilities_1 = require("@r-t-p/utilities");
class ParticleFactory {
    constructor(renderer) {
        this.renderer = renderer;
        this.configs = new Map();
    }
    RegisterParticleType(config) {
        this.configs.set(config.ParticleType, config);
    }
    CreateParticleGenerator(particleType, drawSpec) {
        let config = this.configs.get(particleType);
        if (config) {
            return new GenericParticleGenerator(config, this.renderer, drawSpec);
        }
        return null;
    }
}
exports.ParticleFactory = ParticleFactory;
class GenericParticleGenerator {
    constructor(config, renderer, drawableSpec) {
        this.config = config;
        this.renderer = renderer;
        this.drawableSpec = drawableSpec;
        this.emissionFrequencyInMilliseconds = 100;
        this.age = 0;
        this.particles = [];
        this.timeSinceEmission = 0;
        this.id = (0, utilities_1.generateUUID)();
        this.speed = 0;
        this.direction = 0;
        this.particleType = config.ParticleType;
        this.lifespan = Infinity;
        this.isEmitting = false;
    }
    handleInput() {
    }
    update(elapsedMilliseconds) {
        this.emitParticles(elapsedMilliseconds);
        updateParticle(elapsedMilliseconds, this);
        for (let particle of this.particles) {
            updateParticle(elapsedMilliseconds, particle);
        }
    }
    render() {
        renderParticle(this.renderer, this);
        for (let particle of this.particles) {
            renderParticle(this.renderer, particle);
        }
    }
    isFinished() {
        return this.lifespan < this.age;
    }
    GetParticles() {
        return this.particles;
    }
    CreateParticle() {
        let spec = Object.assign(this.config.drawableSpec);
        let particle = {
            age: 0,
            direction: (0, utilities_1.NextGaussian)(this.config.direction.Mean, this.config.direction.StdDev),
            drawableSpec: spec,
            lifespan: (0, utilities_1.NextGaussian)(this.config.lifeRange.Mean, this.config.lifeRange.StdDev),
            particleType: this.config.ParticleType,
            speed: (0, utilities_1.NextGaussian)(this.config.speedRange.Mean, this.config.speedRange.StdDev),
        };
        setCenter(particle, getCenter(this));
        this.particles.push(particle);
    }
    emitParticles(elapsedMilliseconds) {
        if (!this.isEmitting || this.emissionFrequencyInMilliseconds <= 0)
            return;
        this.timeSinceEmission += elapsedMilliseconds;
        let particlesNeeded = Math.floor(this.timeSinceEmission / this.emissionFrequencyInMilliseconds);
        let remainder = this.timeSinceEmission % this.emissionFrequencyInMilliseconds;
        for (let i = 0; i < particlesNeeded; ++i) {
            this.CreateParticle();
        }
        this.timeSinceEmission = remainder;
    }
}
function updateParticle(elapsedMilliseconds, particle) {
    particle.age += elapsedMilliseconds;
    switch (particle.drawableSpec.spec) {
        case renderer_1.RendererSpecType.CircleSpec:
            particle.drawableSpec.center.x += (Math.sin(particle.direction) * particle.speed * elapsedMilliseconds);
            particle.drawableSpec.center.y -= (Math.cos(particle.direction) * particle.speed * elapsedMilliseconds);
            particle.age += elapsedMilliseconds;
            break;
        case renderer_1.RendererSpecType.ImageSpec:
            particle.drawableSpec.center.x += (Math.sin(particle.direction) * particle.speed * elapsedMilliseconds);
            particle.drawableSpec.center.y -= (Math.cos(particle.direction) * particle.speed * elapsedMilliseconds);
            particle.age += elapsedMilliseconds;
            break;
        case renderer_1.RendererSpecType.RectSpec:
            particle.drawableSpec.startPoint.x += (Math.sin(particle.direction) * particle.speed * elapsedMilliseconds);
            particle.drawableSpec.startPoint.y -= (Math.cos(particle.direction) * particle.speed * elapsedMilliseconds);
            particle.age += elapsedMilliseconds;
            break;
        case renderer_1.RendererSpecType.TextSpec:
            particle.drawableSpec.startPoint.x += (Math.sin(particle.direction) * particle.speed * elapsedMilliseconds);
            particle.drawableSpec.startPoint.y -= (Math.cos(particle.direction) * particle.speed * elapsedMilliseconds);
            particle.age += elapsedMilliseconds;
            break;
    }
}
function setCenter(particle, point) {
    switch (particle.drawableSpec.spec) {
        case renderer_1.RendererSpecType.CircleSpec:
        case renderer_1.RendererSpecType.ImageSpec:
            particle.drawableSpec.center = point;
            break;
        case renderer_1.RendererSpecType.RectSpec:
        case renderer_1.RendererSpecType.TextSpec:
            particle.drawableSpec.startPoint = point;
            break;
    }
}
function getCenter(particle) {
    switch (particle.drawableSpec.spec) {
        case renderer_1.RendererSpecType.CircleSpec:
        case renderer_1.RendererSpecType.ImageSpec:
            return particle.drawableSpec.center;
        case renderer_1.RendererSpecType.RectSpec:
        case renderer_1.RendererSpecType.TextSpec:
            return particle.drawableSpec.startPoint;
    }
}
function renderParticle(renderer, particle) {
    renderer.Draw(particle.drawableSpec);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBa0Y7QUFDbEYsZ0RBQThEO0FBbUM5RCxNQUFhLGVBQWU7SUFHMUIsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO0lBQ3ZELENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxNQUEwQjtRQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSx1QkFBdUIsQ0FBQyxZQUFvQixFQUFFLFFBQXVCO1FBQzFFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVDLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxJQUFJLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFsQkQsMENBa0JDO0FBRUQsTUFBTSx3QkFBd0I7SUFZNUIsWUFBbUIsTUFBMEIsRUFBVSxRQUFrQixFQUFTLFlBQTJCO1FBQTFGLFdBQU0sR0FBTixNQUFNLENBQW9CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFlO1FBVnRHLG9DQUErQixHQUFXLEdBQUcsQ0FBQztRQUM5QyxRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBTWYsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUMzQixzQkFBaUIsR0FBVyxDQUFDLENBQUM7UUFHcEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFBLHdCQUFZLEdBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMs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
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
        let particle = {
            age: 0,
            direction: (0, utilities_1.NextGaussian)(this.config.direction.Mean, this.config.direction.StdDev),
            drawableSpec: Object.assign(this.config.drawableSpec),
            lifespan: (0, utilities_1.NextGaussian)(this.config.lifeRange.Mean, this.config.lifeRange.StdDev),
            particleType: this.config.ParticleType,
            speed: (0, utilities_1.NextGaussian)(this.config.speedRange.Mean, this.config.speedRange.StdDev),
        };
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
function renderParticle(renderer, particle) {
    renderer.Draw(particle.drawableSpec);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBMkU7QUFDM0UsZ0RBQThEO0FBbUM5RCxNQUFhLGVBQWU7SUFHMUIsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO0lBQ3ZELENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxNQUEwQjtRQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSx1QkFBdUIsQ0FBQyxZQUFvQixFQUFFLFFBQXVCO1FBQzFFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVDLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxJQUFJLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFsQkQsMENBa0JDO0FBRUQsTUFBTSx3QkFBd0I7SUFZNUIsWUFBbUIsTUFBMEIsRUFBVSxRQUFrQixFQUFTLFlBQTJCO1FBQTFGLFdBQU0sR0FBTixNQUFNLENBQW9CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFlO1FBVnRHLG9DQUErQixHQUFXLEdBQUcsQ0FBQztRQUM5QyxRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBTWYsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUMzQixzQkFBaUIsR0FBVyxDQUFDLENBQUM7UUFHcEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFBLHdCQUFZLEdBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMs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USxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzVHLFFBQVEsQ0FBQyxHQUFHLElBQUksbUJBQW1CLENBQUM7WUFDcEMsTUFBTTtRQUNSLEtBQUssMkJBQWdCLENBQUMsUUFBUTtZQUM1QixRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDLENBQUM7WUFDNUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzVHLFFBQVEsQ0FBQyxHQUFHLElBQUksbUJBQW1CLENBQUM7WUFDcEMsTUFBTTtLQUNUO0FBQ0gsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLFFBQWtCLEVBQUUsUUFBa0I7SUFDNUQsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkMsQ0FBQyJ9
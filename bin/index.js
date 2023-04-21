"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticleFactory = void 0;
const renderer_1 = require("@r-t-p/renderer");
const utilities_1 = require("@r-t-p/utilities");
class ParticleFactory {
    constructor(renderer, drawSpec) {
        this.renderer = renderer;
        this.drawSpec = drawSpec;
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
        this.id = (0, utilities_1.generateUUID)();
        this.speed = 0;
        this.direction = 0;
        this.particleType = config.ParticleType;
        this.lifespan = Infinity;
    }
    handleInput() {
        for (let particle of this.particles) {
            particle.handleInput();
        }
    }
    update(elapsedMilliseconds) {
        updateParticle(elapsedMilliseconds, this);
        for (let particle of this.particles) {
            particle.update(elapsedMilliseconds);
        }
    }
    render() {
        renderParticle(this.renderer, this);
        for (let particle of this.particles) {
            particle.render();
        }
    }
    isFinished() {
        return this.lifespan < this.age;
    }
    GetParticles() {
        return this.particles;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBZ0g7QUFDaEgsZ0RBQWdEO0FBb0NoRCxNQUFhLGVBQWU7SUFHMUIsWUFBb0IsUUFBa0IsRUFBUyxRQUF1QjtRQUFsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQUNwRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO0lBQ3ZELENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxNQUEwQjtRQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSx1QkFBdUIsQ0FBQyxZQUFvQixFQUFFLFFBQXVCO1FBQzFFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVDLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxJQUFJLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFsQkQsMENBa0JDO0FBRUQsTUFBTSx3QkFBd0I7SUFVNUIsWUFBbUIsTUFBMEIsRUFBVSxRQUFrQixFQUFTLFlBQTJCO1FBQTFGLFdBQU0sR0FBTixNQUFNLENBQW9CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFlO1FBUnRHLG9DQUErQixHQUFXLEdBQUcsQ0FBQztRQUM5QyxRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBS2YsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUdqQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUEsd0JBQVksR0FBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRCxXQUFXO1FBQ1QsS0FBSyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25DLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsbUJBQTJCO1FBQ2hDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQyxLQUFLLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxLQUFLLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQyxDQUFDO0lBRUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0NBQ0Y7QUFFRCxTQUFTLGNBQWMsQ0FBQyxtQkFBMkIsRUFBRSxRQUFrQjtJQUNyRSxRQUFRLENBQUMsR0FBRyxJQUFJLG1CQUFtQixDQUFDO0lBQ3BDLFFBQVEsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7UUFDbEMsS0FBSywyQkFBZ0IsQ0FBQyxVQUFVO1lBQzlCLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztZQUN4RyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDLENBQUM7WUFDeEcsUUFBUSxDQUFDLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztZQUNwQyxNQUFNO1FBQ1IsS0FBSywyQkFBZ0IsQ0FBQyxTQUFTO1lBQzdCLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztZQUN4RyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDLENBQUM7WUFDeEcsUUFBUSxDQUFDLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztZQUNwQyxNQUFNO1FBQ1IsS0FBSywyQkFBZ0IsQ0FBQyxRQUFRO1lBQzVCLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztZQUM1RyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDLENBQUM7WUFDNUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztZQUNwQyxNQUFNO1FBQ1IsS0FBSywyQkFBZ0IsQ0FBQyxRQUFRO1lBQzVCLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztZQUM1RyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDLENBQUM7WUFDNUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztZQUNwQyxNQUFNO0tBQ1Q7QUFDSCxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsUUFBa0IsRUFBRSxRQUFrQjtJQUM1RCxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxDQUFDIn0=
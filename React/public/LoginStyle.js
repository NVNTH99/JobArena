window.onload = function () {
  Particles.init({
    selector: ".background",
  });
};
const particles = Particles.init({
  selector: ".background",
  color: ["#03dac6", "#6058A3", "#ff0266"],
  connectParticles: true,
  responsive: [
    {
      breakpoint: 768,
      options: {
        color: ["#faebd7", "#03dac6", "#ff0266"],
        maxParticles: 80,
        connectParticles: false,
      },
    },
  ],
});

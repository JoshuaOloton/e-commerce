import { jost } from "@/app/layout";

const Hero = () => {
  return (
    <section className={`${jost.className} w-full h-screen border border-black`}>
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr]">
        <div>
          <h4>Unleash Innovation <br /> in every Byte</h4>
          <p>Explore a world of cutting edge Tecnh</p>
        </div>
        <div>h</div>
      </div>
    </section>
  );
};

export default Hero;

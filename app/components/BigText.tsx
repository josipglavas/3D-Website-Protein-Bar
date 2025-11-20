const BigText = () => {
  return (
    <section className="md:min-h-screen min-h-fit w-screen overflow-hidden bg-[#efe0be] text-[#612f0e] z-50 relative backdrop-blur-lg">
      <h2 className="grid w-full gap-[3vw] py-10 text-center font-black uppercase leading-[0.7] text-balance">
        <div className="text-[28vw] md:text-[34vw]">Pure</div>

        <div className="grid gap-[3vw] pl-6 text-[20vw] md:text-[13.2vw] md:flex md:pl-24">
          <span className="inline-block">joy</span>
          <span className="inline-block text-[22vw] md:text-[13.2vw]">in</span>
          <span className="inline-block text-[28vw] md:text-[13.2vw]">
            every
          </span>
        </div>

        {/* BITE */}
        <div className="text-[30vw] md:text-[42vw]">Bite</div>
      </h2>
    </section>
  );
};

export default BigText;

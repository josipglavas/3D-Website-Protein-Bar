const BigText = () => {
  return (
    <section className="min-h-screen w-screen overflow-hidden bg-[#efe0be] text-[#612f0e] z-50 relative backdrop-blur-lg">
      <h2 className="grid w-full gap-[3vw] py-10 text-center font-black uppercase leading-[.7] text-balance">
        <div className="text-[34vw]">Pure</div>
        <div className="grid gap-[3vw] text-[34vw] md:flex md:text-[13.2vw] pl-24">
          <span className="inline-block">joy </span>
          <span className="inline-block max-md:text-[27vw]">in </span>
          <span className="inline-block max-md:text-[40vw]">every </span>
        </div>
        <div className="text-[42vw]">Bite</div>
      </h2>
    </section>
  );
};

export default BigText;

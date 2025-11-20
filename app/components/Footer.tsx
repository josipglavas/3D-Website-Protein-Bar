import BombusLogo from "./BombusLogo";
import CircleText from "./CurvedText";

type Props = {};

const Footer = ({}: Props) => {
  return (
    <footer className="bg-linear-90 from-yellow-400 to-orange-300 text-[#FE6334] z-60">
      <div className="relative mx-auto w-full max-w-4xl px-4 flex-center ">
        <BombusLogo
          className="flex items-center pb-20 pt-14 md:scale-100 scale-[80%]"
          width={360}
          height={360}
        />
        <div className="absolute md:right-24 right-20 md:-top-24 -top-16 size-28 -translate-y-14 md:size-48 md:-translate-y-28 rounded-full z-60 md:scale-100 scale-50">
          <CircleText />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

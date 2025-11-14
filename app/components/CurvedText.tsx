import React from "react";

const CurvedText = () => {
  const svgSize = 500;
  const svgCenter = svgSize / 2;

  return (
    <svg
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      width="400"
      height="400"
      className="animate-spin-slow origin-center scale-75"
    >
      <circle cx={svgCenter} cy={svgCenter} r="230" className="fill-white" />

      <path
        id="circleCurve"
        d={`M ${svgCenter},90 A 160,160 0 1,1 ${svgCenter - 0.1},90`}
        fill="none"
      />

      <text
        fontSize="52"
        className="fill-[#612f0e] font-bold uppercase"
        letterSpacing="2"
      >
        <textPath
          xlinkHref="#circleCurve"
          startOffset="68%"
          textAnchor="middle"
        >
          Less ingredients
        </textPath>
        <textPath
          xlinkHref="#circleCurve"
          startOffset="18%"
          textAnchor="middle"
        >
          More taste
        </textPath>
      </text>
    </svg>
  );
};

export default CurvedText;

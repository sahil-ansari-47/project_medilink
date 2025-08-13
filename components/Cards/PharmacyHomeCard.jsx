import Image from "@node_modules/next/image";

const PharmacyHomeCard = () => {
  return (
    <div className="homecard">
      <div className="absolute top-10 right-10">
        <h2 className="homecard-title text-red-900">
          Order Medicine
        </h2>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center">
        <Image
          className="w-40 sm:w-48 object-contain -translate-y-3 -translate-x-20"
          src="/assets/pills.png"
          alt="Doctor"
          width={500}
          height={500}
          priority
        />
      </div>

      <div className="wave">
        <img
          className="w-full"
          src="/waves/wave (1).svg"
          alt="Wave background"
        />
      </div>
    </div>
  );
};

export default PharmacyHomeCard;

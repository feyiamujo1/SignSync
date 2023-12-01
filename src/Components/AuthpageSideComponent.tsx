const AuthpageSideComponent = () => {
  return (
    <div className="flex w-full items-end bg-login-image bg-cover bg-[60%] py-8 md:w-[700px] md:py-10 xl:w-[950px]">
      <div className="mx-auto w-11/12 mt-14 space-y-4 text-white md:w-10/12">
        <div>
          <h1 className="text-lg font-semibold text-primary md:text-2xl ">
            Bridging Communication Gaps with Sign Language!
          </h1>
          <p className="text-sm md:text-base">
            Join us as we work towards a future where education knows no bounds.
          </p>
        </div>
        <ol className="hidden list-disc space-y-3 md:block">
          <li className="ml-4">
            Promoting inclusivity by providing a platform for users to actively
            contribute to the development of a translation model that can
            benefit the entire deaf and hard of hearing community.
          </li>
          <li className="ml-4">
            Our goal is to empower deaf or hard of hearing students by creating
            a tool that facilitates better understanding in classrooms through
            sign language translation.
          </li>
        </ol>
        <div className="hidden w-full justify-end md:flex">
          <p className=" text-white">Join us now!</p>
        </div>
      </div>
    </div>
  );
};

export default AuthpageSideComponent;

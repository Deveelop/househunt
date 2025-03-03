



export default function Home() {
 

  return (
    <section>
    <div className=" items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
      <div className="flex w-full mx-auto text-left">
        <div className=" inline-flex items-center mx-auto align-middle">
          <div className="text-center">
            <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
              Search, Inspect, And Secure <br className="hidden lg:block"/>
              Your Dream Apartment - All At Your Finger Tip
            </h1>
            <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">We eliminate house agents, giving you direct access to landlords for a smoother, faster and more affordable house-hunting experience.</p>
            <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
            <form className="mt-3 rounded-lg sm:mt-0 sm:ml-3 flex gap-2">
                <input placeholder="Search by location" className="items-center block px-5 lg:px-10 py-3.5 text-base font-medium text-center  border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"/>
              <button className=" py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white ">Search</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
